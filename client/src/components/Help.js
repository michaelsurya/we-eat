import React, { useState } from "react";
import { Accordion, Container, Header, Icon } from "semantic-ui-react";
import styles from "../assets/css/help.module.css";
import { Link } from "react-router-dom";

const Help = () => {
  const [active, setActive] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = active === index ? -1 : index;
    console.log(newIndex);

    setActive(newIndex);
  };

  return (
    <Container className={`${styles.top_margin} ${styles.container}`}>
      <Header as="h1" textAlign="center">
        Help
      </Header>

      <Header as="h1">
        Account
        <Header.Subheader>Signing Up, Login & Passwords</Header.Subheader>
      </Header>
      <Accordion fluid styled>
        {/* 0 */}
        <Accordion.Title active={active === 0} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          How do I sign up?
        </Accordion.Title>
        <Accordion.Content active={active === 0}>
          <p>
            Creating account is very easy! You can just go to{" "}
            <Link to="/register">Sign up</Link> and create a new account there.
            <br />
            <br /> Once you have created your account dont forget to{" "}
            <b>verify</b> your email.
          </p>
        </Accordion.Content>
        {/* 1 */}
        <Accordion.Title active={active === 1} index={1} onClick={handleClick}>
          <Icon name="dropdown" />I have created a new account, but I cant log
          in.
        </Accordion.Title>
        <Accordion.Content active={active === 1}>
          <p>
            To be able to log in you need to verify your email address. After
            creating a new account an email containing a verification link would
            be sent to you.
            <br />
            <br />
            If for some reasons, you did not get the email, you could request
            for a new verification email <Link to="/verify/email">here</Link>
            <br />
            <b>Note: The verification link is only valid for 24 hours.</b>
          </p>
        </Accordion.Content>
        {/* 2 */}
        <Accordion.Title active={active === 2} index={2} onClick={handleClick}>
          <Icon name="dropdown" />
          How do I reset my password?
        </Accordion.Title>
        <Accordion.Content active={active === 2}>
          <p>Unfortunately we have not implemented this feature yet.</p>
        </Accordion.Content>
      </Accordion>

      <Header as="h1">
        Profile
        <Header.Subheader>Profile photo and your information</Header.Subheader>
      </Header>
      <Accordion fluid styled>
        {/* 3 */}
        <Accordion.Title active={active === 3} index={3} onClick={handleClick}>
          <Icon name="dropdown" />
          Do I need a profile picture?
        </Accordion.Title>
        <Accordion.Content active={active === 3}>
          <p>
            Profile picture is not a must but it is recommended to have one.
            Having a profile picture could increase your credibility
          </p>
        </Accordion.Content>
        {/* 4 */}
        <Accordion.Title active={active === 4} index={4} onClick={handleClick}>
          <Icon name="dropdown" />
          How do I edit my profile?
        </Accordion.Title>
        <Accordion.Content active={active === 4}>
          <p>
            If you are logged in you can go{" "}
            <Link to={`/profile/edit/`}>here</Link>
          </p>
        </Accordion.Content>
        {/* 5 */}
        <Accordion.Title active={active === 5} index={5} onClick={handleClick}>
          <Icon name="dropdown" />
          Would my information be safe?
        </Accordion.Title>
        <Accordion.Content active={active === 5}>
          <p>
            All your information is stored in a secure database. In addition,
            your personal information (email, phone number, location) would not
            be shared publicly.
            <br />
            <br />
            Your personal information would only be shared to the costumers or
            host once a reservation has been confirmed
          </p>
        </Accordion.Content>
      </Accordion>

      <Header as="h1">
        Reservation
        <Header.Subheader>Making a reservation, how it works</Header.Subheader>
      </Header>
      <Accordion fluid styled>
        {/* 6 */}
        <Accordion.Title active={active === 6} index={6} onClick={handleClick}>
          <Icon name="dropdown" />
          How do I make a reservation?
        </Accordion.Title>
        <Accordion.Content active={active === 6}>
          <p>
            On an event page you would see the reservation button on the right
            side of the screen.
            <br />
            <br />
            You can make a reservation if:
            <ul>
              <li>The event is not full</li>
              <li>
                The event is not yours. Of course you shouldn't book your own
                event.
              </li>
              <li>
                You have not make any reservation for this event. You can only
                reserve one per event.
              </li>
            </ul>
          </p>
        </Accordion.Content>
        {/* 7 */}
        <Accordion.Title active={active === 7} index={7} onClick={handleClick}>
          <Icon name="dropdown" />I have made a reservation, what next?
        </Accordion.Title>
        <Accordion.Content active={active === 7}>
          <p>
            You just need to wait for the host to either accept or reject your
            reservation request.
            <br />
            You would receive an email once the host make any action.
            <br />
            <br />
            Please note that the host might not take any action and thus your
            reservation would be left pending.
          </p>
        </Accordion.Content>
        {/* 8 */}
        <Accordion.Title active={active === 8} index={8} onClick={handleClick}>
          <Icon name="dropdown" />
          Where can I keep track of all my reservations?
        </Accordion.Title>
        <Accordion.Content active={active === 8}>
          <p>
            You can go to <Link to="/user/reservations">reservations</Link> page
            to see all your reservations.
          </p>
        </Accordion.Content>
        {/* 9 */}
        <Accordion.Title active={active === 9} index={9} onClick={handleClick}>
          <Icon name="dropdown" />I need to contact the host
        </Accordion.Title>
        <Accordion.Content active={active === 9}>
          <p>
            Once your reservation is confirmed you would be able to see the
            host's contact details in the{" "}
            <Link to="/user/reservations">Reservations</Link> page.
          </p>
        </Accordion.Content>
        {/* 10 */}
        <Accordion.Title
          active={active === 10}
          index={10}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          How do I cancel my reservation?
        </Accordion.Title>
        <Accordion.Content active={active === 10}>
          <p>Unfortunately we have not implemented this feature yet.</p>
        </Accordion.Content>
      </Accordion>

      <Header as="h1">
        Becoming a host
        <Header.Subheader>
          Creating an event, accepting reservations
        </Header.Subheader>
      </Header>
      <Accordion fluid styled>
        {/* 11 */}
        <Accordion.Title
          active={active === 11}
          index={11}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          How to become a host?
        </Accordion.Title>
        <Accordion.Content active={active === 11}>
          <p>
            By simply creating your first event{" "}
            <Link to="/event/new">here</Link>
          </p>
        </Accordion.Content>
        {/* 12 */}
        <Accordion.Title
          active={active === 12}
          index={12}
          onClick={handleClick}
        >
          <Icon name="dropdown" />I can't make a new event
        </Accordion.Title>
        <Accordion.Content active={active === 12}>
          <p>
            To create your first event you need to be a verified account.
            <br />A verified account needs to provide a <b>
              valid email
            </b> and <b>valid phone number</b>
            <br />
            <br />
            To verify your account you can go <Link to="/verify/">here</Link>
          </p>
        </Accordion.Content>
        {/* 13 */}
        <Accordion.Title
          active={active === 13}
          index={13}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Where can I see all my events?
        </Accordion.Title>
        <Accordion.Content active={active === 13}>
          <p>
            You can see all your events in the{" "}
            <Link to="/user/events">My Events</Link> page.
          </p>
        </Accordion.Content>
        {/* 14 */}
        <Accordion.Title
          active={active === 14}
          index={14}
          onClick={handleClick}
        >
          <Icon name="dropdown" />I just received a reservation request, where
          can I take actions?
        </Accordion.Title>
        <Accordion.Content active={active === 14}>
          <p>
            You can go to <Link to="/user/events">My Events</Link> page.
            <br />
            <br />
            On the right side of each of your events, there would be an action
            prompts.
          </p>
        </Accordion.Content>
      </Accordion>

      <Header as="h1">
        Reviews
        <Header.Subheader>
          Why is it important, how to write a review
        </Header.Subheader>
      </Header>
      <Accordion fluid styled>
        {/* 15 */}
        <Accordion.Title
          active={active === 15}
          index={15}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          What is it?
        </Accordion.Title>
        <Accordion.Content active={active === 15}>
          <p>
            Reviews are very important for both costumers and hosts to help them
            in making decisions.
          </p>
        </Accordion.Content>
        {/* 16 */}
        <Accordion.Title
          active={active === 16}
          index={16}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          How to write a review?
        </Accordion.Title>
        <Accordion.Content active={active === 16}>
          <p>
            You could write a review one day after the event finished and you
            only have three days to write a review.
            <br />
            For the host "Write a review" button could be seen in{" "}
            <Link to="/user/events">My Events</Link> page.
            <br />
            For the costumer "Write a review" button could be seen in{" "}
            <Link to="/user/reservations">Reservations</Link> page.
            <br />
            <br />
            Please note that "Write a review" button would only be visible when
            it is possible to write one.
          </p>
        </Accordion.Content>
      </Accordion>
    </Container>
  );
};

export default Help;
