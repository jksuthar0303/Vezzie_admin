/* eslint-disable react/no-unescaped-entities */
import { m } from 'framer-motion';
// @mui
import { Typography, Card, Link, Box, List, ListItem } from '@mui/material';
//
import { varFade, MotionViewport } from '../../components/animate';
import Scrollbar from '../../components/scrollbar';

// ----------------------------------------------------------------------

export default function PrivacyContent() {
  const companyName = 'Vezzie';
  const webSite = (
    <Link target="_blank" href="https://vezzie.in">
      https://vezzie.in
    </Link>
  );
  const ProfileLink = (
    <Link target="_blank" href="https://vezzie.in/user/profile">
      https://vezzie.in/user/profile
    </Link>
  );
  const address = {
    line1: 'Antyodya Nagar Bikaner',
    line2: 'Bikaner, Rajasthan 334001',
    line3: 'India',
  };
  const mailId = <Link href="mailto:info.vizze@gmail.com">info.vizze@gmail.com</Link>;
  return (
    <Card sx={{ p: 5 }} component={MotionViewport} spacing={3}>
      <Scrollbar sx={{ height: 700 }}>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">
              PRIVACY NOTICE <br />
              Last updated October 1, 2023
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              This privacy notice for {companyName} ("Company" "we, " "us," or "our'), describes how
              and why we might collect, store, use, and/or share ('process") your information when
              you use our services ("Services"), such as when you:
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              Visit our website at {webSite}, or any website of ours that links to this privacy
              notice Engage with us in other related ways including any sales, marketing, or events
            </Typography>
          </Box>
        </m.div>
        <m.div sx={{ mb: 20 }} variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 2 }} variant="p">
              Questions or concerns? Reading this privacy notice will help you understand your
              privacy rights and choices. If you do not agree with our policies and practices,
              please do not use our Services. If you still have any questions or concerns, please
              contact us at {mailId}.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">
              SUMMARY OF KEY POINTS <br />
              This summary provides key points from our privacy notice
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>What personal information do we process?</strong> When you visit, use, or
              navigate our Services, we may process personal information depending on how you
              interact with {companyName} and the Services, the choices you make, and the products
              and features you use.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>Do we process any sensitive personal information?</strong> We do not process
              sensitive personal information.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>Do you receive any information from third parties?</strong> We do not receive
              any information from third parties.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>How do you process my information?</strong> We process your information to
              provide, improve, and administer our Services, communicate with you, for security and
              fraud prevention, and to comply with law. We may also process your information for
              other purposes with your consent. We process your information only when we have a
              valid legal reason to do so.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>
                In what situations and with which parties do we share personal information?
              </strong>{' '}
              We may share information in specific situations and with specific third parties.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>How do we keep your information safe?</strong> We have organizational and
              technical processes and procedures in place to protect your personal information.
              However, no electronic transmission over the internet or information storage
              technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that
              hackers, cybercriminals, or other unauthorized third parties will not be able to
              defeat our security and improperly collect, access, steal, or modify your information.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>What are your rights?</strong> Depending on where you are located
              geographically, the applicable privacy law may mean you have certain rights regarding
              your personal information. How do I exercise my rights? The easiest way to exercise
              your rights is by filling out our data subject request form available here:
              {ProfileLink}, or by contacting us. We will consider and act upon any request in
              accordance with applicable data protection laws.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6">
              Want to learn more about what Vezzie. does with any information we collect?
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">
              1. WHAT INFORMATION DO WE COLLECT? <br />
              Personal information you disclose to us
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strog>In Short:</strog> We collect personal information that you provide to us.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              We collect personal information that you voluntarily provide to us when you register
              on the Services, express an interest in obtaining information about us or our products
              and Services, when you participate in activities on the Services, or otherwise when
              you contact us.
            </Typography>{' '}
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strog>Personal Information Provided by You.</strog> The personal information that we
              collect depends on the context of your interactions with us and the Services, the
              choices you make, and the products and features you use. The personal information we
              collect may include the following:
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <List>
              <ListItem>email addresses</ListItem>
              <ListItem>Usernames</ListItem>

              <ListItem>passwords</ListItem>

              <ListItem>Contact preferences</ListItem>

              <ListItem>names</ListItem>

              <ListItem>phone numbers</ListItem>

              <ListItem>Contact or authentication data</ListItem>

              <ListItem>billing addresses</ListItem>

              <ListItem>Social media login credentials</ListItem>

              <ListItem>Company name & Address</ListItem>
            </List>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strog>Sensitive Information.</strog> We do not process sensitive information.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strog>Payment Data.</strog> We may collect data necessary to process your payment if
              you make purchases, such as your payment instrument number (such as a credit card
              number), and the security code associated with your payment instrument. All payment
              data is stored by Razorpay. You may find their privacy notice link(s) here:{' '}
              <Link target="_blank" href="https:/razorpay.com/privacy">
                https:/razorpay.com/privacy
              </Link>
              .
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strog>Social Media Login Data.</strog> We may provide you with the option to register
              with us using your existing social media account details, like your Facebook, Twitter,
              or other social media account. If you choose to register in this way, we will collect
              the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              below.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              All personal information that you provide to us must be true, complete, and accurate,
              and you must notify us of any changes to such personal information.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">2. HOW DO WE PROCESS YOUR INFORMATION?</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short:</strong>
              We process your information to provide, improve, and administer our Services,
              communicate with you, for security and fraud prevention, and to comply with law. We
              may also process your information for other purposes with your consent.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>
                We process your personal information for a variety of reasons, depending on how you
                interact with our Services, including:
              </strong>
            </Typography>
          </Box>
        </m.div>
        <List>
          <ListItem>
            To facilitate account creation and authentication and otherwise manage user accounts. We
            may process your information so you can create and log in to your account, as well as
            keep your account in working order.
          </ListItem>
          <ListItem>
            To deliver and facilitate delivery of services to the user. We may process your
            information to provide you with the requested service.
          </ListItem>
          <ListItem>
            To respond to user inquiries/offer support to users. We may process your information to
            respond to your inquiries and solve any potential issues you might have with the
            requested service.
          </ListItem>
          <ListItem>
            To fulfill and manage your orders. We may process your information to fulfill and manage
            your orders, payments, returns, and exchanges made through the Services.
          </ListItem>
          <ListItem>
            To evaluate and improve our Services, products, marketing, and your experience. We may
            process your information when we believe it is necessary to identify usage trends,
            determine the effectiveness of our promotional campaigns, and to evaluate and improve
            our Services, products, marketing, and your experience.
          </ListItem>
          <ListItem>
            To determine the effectiveness of our marketing and promotional campaigns. We may
            process your information to better understand how to provide marketing and promotional
            campaigns that are most relevant to you.
          </ListItem>
        </List>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">
              3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short:</strong>
              We may share information in specific situations described in this section and/or with
              the following third parties.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>
                We may need to share your personal information in the following situations
              </strong>
            </Typography>
          </Box>
        </m.div>
        <List>
          <ListItem>
            Business Transfers. We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets, financing, or acquisition of
            all or a portion of our business to another company
          </ListItem>
        </List>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">
              4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short:</strong>
              We may use cookies and other tracking technologies to collect and store your
              information.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              We may use cookies and Similar tracking technologies (like web beacons and pixels) to
              access or store information. Specific information about how we use such technologies
              and how you can refuse certain cookies is set out in our Cookie Notice.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short:</strong>
              lf you choose to register or log in to our services using a social media account, we
              may have access to certain information about you.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              Our Services offer you the ability to register and log in using your third-party
              social media account details (like your Facebook or Google logins). Where you choose
              to do this, we will receive certain profile information and some account details like
              (followers, subscribers, likes and more.) and other analysis data witch you have right
              to choose on behalf from your social media provider. The profile information we
              receive may vary depending on the social media provider concerned, but will often
              include your name, email address, friends list, and profile picture, as well as other
              information you choose to make public on such a social media platform.{' '}
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              We will use the information we receive only for the purposes that are described in
              this privacy notice or that are otherwise made clear to you on the relevant Services.
              Please note that we do not control, and are not responsible for, other uses of your
              personal information by your third-party social media provider. We recommend that you
              review their privacy notice to understand how they collect, use and share your
              personal information, and how you can set your privacy preferences on their sites and
              apps.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short:</strong>
              We keep your information for as long as necessary to fulfill the purposes outlined in
              this privacy notice unless otherwise required by law.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              We will only keep your personal information for as long as it is necessary for the
              purposes set out in this privacy notice, unless a longer retention period is required
              or permitted by law (such as tax, accounting, or other legal requirements). No purpose
              in this notice will require us keeping your personal information for longer than the
              period of time in which users have an account with us.{' '}
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              When we have no ongoing legitimate business need to process your personal information,
              we will either delete or anonymize such information, or, if this is not possible for
              example, because your personal information has been stored in backup archives, then we
              will securely store your personal information and isolate it from any further
              processing until deletion is possible.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">8. WHAT ARE YOUR PRIVACY RIGHTS?</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short:</strong>
              You may review, change, or terminate your account at any time.{' '}
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              If you are located in the EEA or UK and you believe we are unlawfully processing your
              personal, you also have the right to complain to your local data protection
              supervisory authority. You can find their contact details here:{' '}
              <Link
                href="https://ec.europa.eu/justice/data/bodies/authorities/index_en.htm"
                target="_blank"
              >
                https://ec.europa.eu/justice/data/bodies/authorities/index_en.htm.
              </Link>
              .{' '}
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              Withdrawing your consent: If we are relying on your consent to process your personal
              information, which may be express and/or implied consent depending on the applicable
              law, you have the right to withdraw your consent at any time. You can withdraw your
              consent at any time by contacting us by using the contact details provided in the
              section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below. However, please note that
              this will not affect the lawfulness of the processing before its withdrawal, nor when
              applicable law allows, will it affect the processing of your personal information
              conducted in reliance on lawful processing grounds other than consent.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="p">
              Opting out of marketing and promotional communications: You can unsubscribe from our
              marketing and promotional communications at any time by clicking on the unsubscribe
              link in the emails that we send, or by contacting us using the details provided in the
              section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below. You will then be removed
              from the marketing lists- however, we may still communicate with you, for example to
              send you service-related messages that are necessary for the administration and use of
              your account, to respond to service requests, or for other non-marketing purposes.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Account Information </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              If you would at any time like to review or change the information in your account or
              terminate your account, you can Log in to your account settings and update your user
              account Upon your request to terminate your account, we will deactivate or delete your
              account and information from our active databases. However, we may retain some
              information in our files to prevent fraud, troubleshoot problems, assist with any
              investigations, enforce our legal terms and/or comply with applicable legal
              requirements.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong> Cookies and similar technologies:</strong> Most Web browsers are set to
              accept cookies by default. If you prefer, you can usually choose to set your browser
              to remove cookies and to reject cookies. If you choose to remove cookies or reject
              cookies, this could affect certain features or services of our Services. To opt out of
              interest-based advertising by advertisers on our Services visit
              <Link target="_blank" href="http://www.aboutads.info/choices">
                http://www.aboutads.info/choices
              </Link>
              .
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              If you have questions or comments about your privacy rights, you may email us at{' '}
              {mailId}.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">9. CONTROLS FOR DO-NOT-TRACK FEATURES </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              Most web browsers and some mobile operating systems and mobile applications include a
              Do-Not-Track ('DNT") feature or setting you can activate to signal your privacy
              preference not to have data about your online browsing activities monitored and
              collected. At this stage no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not currently respond to
              DNT browser signals or any other mechanism that automatically communicates your choice
              not to be tracked online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a revised version of
              this privacy notice.{' '}
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">10. DO WE MAKE UPDATES TO THIS NOTICE?</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              <strong>In Short: </strong>
              Yes, we will update this notice as necessary to stay compliant with relevant laws.
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              We may update this privacy notice from time to time. The updated version will be
              indicated by an updated "Revised" date and the updated version will be effective as
              soon as it is accessible. If we make material changes to this privacy notice, we may
              notify you either by prominently posting a notice of such changes or by directly
              sending you a notification. We encourage you to review this privacy notice frequently
              to be informed of how we are protecting your information.
            </Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              If you have questions or comments about this notice, you may email us at {mailId} or
              by post to:
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">{companyName}</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">{address.line1}</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">{address.line2}</Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">{address.line3}</Typography>
          </Box>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4">
              12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            </Typography>
          </Box>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="p">
              Based on the applicable laws of your country, you may have the right to request access
              to the personal information we collect from you, change that information, or delete it
              in some circumstances. To request to review, update, or delete your personal
              information, please visit {ProfileLink}{' '}
            </Typography>
          </Box>
        </m.div>
      </Scrollbar>
    </Card>
  );
}
