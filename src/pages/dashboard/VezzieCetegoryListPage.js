import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
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
// redux
import { useDispatch } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';

// sections
import { CategorySearch, CategoryCard } from '../../sections/@dashboard/cetegory/shop';
import { categoryViewList, categoryUpdateOrder } from '../../Services/UserSer';

import EmptyContent from '../../components/empty-content';
import CetegoryNewEditDailog from '../../sections/@dashboard/cetegory/CetegoryNewEditDialog';
import { SkeletonProductItem } from '../../components/skeleton';
import Scrollbar from '../../components/scrollbar';

// ----------------------------------------------------------------------

SortableItem.propTypes = {
  id: PropTypes.string,
  category: PropTypes.object,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

function SortableItem({ id, category, onEditRow, onViewRow }) {
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
      <CategoryCard category={category} onEditRow={onEditRow} onViewRow={onViewRow} />
    </div>
  );
}

// ----------------------------------------------------------------------

export default function VezzieCategoryListPage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);

  const [items, setItems] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [openPopover, setOpenPopover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeId, setActiveId] = useState(null);

  const latestItems = useRef([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => { dispatch(getProducts()); }, [dispatch]);

  useEffect(() => {
    categoryViewList()
      .then(({ data }) => {
        setItems(data?.categorys || []);
        latestItems.current = data?.categorys || [];
      })
      .catch(console.error);
  }, []);

  const filtered = filterName
    ? items.filter((c) => c?.name?.toLowerCase().includes(filterName.toLowerCase()))
    : items;

  const isFiltered = filterName !== '';
  const isNotFound = !isLoading && filtered.length === 0;

  const activeCategory = activeId ? items.find((c) => c._id === activeId) : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragOver = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIndex = prev.findIndex((c) => c._id === active.id);
      const newIndex = prev.findIndex((c) => c._id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = arrayMove(prev, oldIndex, newIndex);
      latestItems.current = next;
      return next;
    });
  };

  const handleDragEnd = async () => {
    setActiveId(null);
    const orderedIds = latestItems.current.map((c) => c._id);
    if (orderedIds.length) {
      try { await categoryUpdateOrder(orderedIds); }
      catch (e) { console.error('Failed to update order', e); }
    }
  };

  const handleDragCancel = () => setActiveId(null);

  const handleEditRow = (category) => {
    setIsEdit(true);
    setEditData(category);
    setOpenPopover(true);
  };

  const handleViewRow = (id) => navigate(PATH_DASHBOARD.product.view(id));

  return (
    <>
      <Helmet><title> Category: List | Vezzie</title></Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Category List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Category' }]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <CategorySearch
            filterName={filterName}
            onFilterName={(e) => setFilterName(e.target.value)}
            isFiltered={isFiltered}
            onResetFilter={() => setFilterName('')}
          />
          <Button
            component={RouterLink}
            onClick={(e) => setOpenPopover(e.currentTarget)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
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
            items={filtered.map((c) => c._id)}
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
                  : filtered.map((category) => (
                      <SortableItem
                        key={category._id}
                        id={category._id}
                        category={category}
                        onEditRow={() => handleEditRow(category)}
                        onViewRow={() => handleViewRow(category._id)}
                      />
                    ))}
              </Box>
            </Scrollbar>
          </SortableContext>

          <DragOverlay>
            {activeCategory ? (
              <Box sx={{ opacity: 0.9, boxShadow: 20, borderRadius: 2, pointerEvents: 'none', cursor: 'grabbing' }}>
                <CategoryCard
                  category={activeCategory}
                  onEditRow={() => {}}
                  onViewRow={() => {}}
                />
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>

        {isNotFound && <EmptyContent title="No category found" />}

        <CetegoryNewEditDailog
          openPopover={openPopover}
          handleClosePopover={() => setOpenPopover(false)}
          isEdit={isEdit}
          currentProduct={editData}
        />
      </Container>
    </>
  );
}

