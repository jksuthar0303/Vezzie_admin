import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

/* eslint-disable import/no-extraneous-dependencies */
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// @mui
import { Container, Stack, Button, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';
import EmptyContent from '../../components/empty-content';
import { SkeletonProductItem } from '../../components/skeleton';
import Scrollbar from '../../components/scrollbar';

// sections
import ProductSearch from '../../sections/@dashboard/product/compnents/ProductSearch';
import ProductCard from '../../sections/@dashboard/product/compnents/ProductCard';
import { productViewList, productUpdateOrder } from '../../Services/UserSer';

// ----------------------------------------------------------------------

SortableProductItem.propTypes = {
  id: PropTypes.string,
  product: PropTypes.object,
  categoryId: PropTypes.string,
};

function SortableProductItem({ id, product, categoryId }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      <ProductCard id={categoryId} product={product} />
    </div>
  );
}

// ----------------------------------------------------------------------

export default function VezzieProductListPage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const latestItems = useRef([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchProductList = async () => {
    setIsLoading(true);
    try {
      const { data } = await productViewList(id);
      const allProducts = data?.products || [];
      setItems(allProducts);
      latestItems.current = allProducts;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
    setFilterName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filtered = filterName
    ? items.filter((p) => p?.name?.toLowerCase().includes(filterName.toLowerCase()))
    : items;

  const isFiltered = filterName !== '';
  const isNotFound = !isLoading && filtered.length === 0;
  const activeProduct = activeId ? items.find((p) => p._id === activeId) : null;

  // --- drag handlers ---

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragOver = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIndex = prev.findIndex((p) => p._id === active.id);
      const newIndex = prev.findIndex((p) => p._id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = arrayMove(prev, oldIndex, newIndex);
      latestItems.current = next;
      return next;
    });
  };

  const handleDragEnd = async () => {
    setActiveId(null);
    const orderedIds = latestItems.current.map((p) => p._id);
    if (orderedIds.length) {
      try { await productUpdateOrder(orderedIds); }
      catch (e) { console.error('Failed to update product order', e); }
    }
  };

  const handleDragCancel = () => setActiveId(null);

  return (
    <>
      <Helmet><title> Product: List | Vezzie</title></Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category', href: PATH_DASHBOARD.category.list },
            { name: 'Product List' },
          ]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ProductSearch
            filterName={filterName}
            onFilterName={(e) => setFilterName(e.target.value)}
            isFiltered={isFiltered}
            onResetFilter={() => setFilterName('')}
          />
          <Button
            component={RouterLink}
            to={PATH_DASHBOARD.product.new}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Stack>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={filtered.map((p) => p._id)}
            strategy={rectSortingStrategy}
          >
            <Scrollbar>
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                }}
              >
                {isLoading
                  ? [...Array(12)].map((_, i) => <SkeletonProductItem key={i} />)
                  : filtered.map((product) => (
                      <SortableProductItem
                        key={product._id}
                        id={product._id}
                        product={product}
                        categoryId={id}
                      />
                    ))}
              </Box>
            </Scrollbar>
          </SortableContext>

          <DragOverlay>
            {activeProduct ? (
              <Box sx={{ opacity: 0.9, boxShadow: 20, borderRadius: 2, pointerEvents: 'none', cursor: 'grabbing' }}>
                <ProductCard id={id} product={activeProduct} />
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>

        {isNotFound && <EmptyContent title="No products found in this category" />}

      </Container>
    </>
  );
}
