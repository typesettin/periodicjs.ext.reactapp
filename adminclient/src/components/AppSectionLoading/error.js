import React, { Component, } from 'react';
import { Hero, HeroBody, Container, Button, } from 're-bulma';


class Loading extends Component {
  render() {
    return (
      <Hero className="__ra_app_section_loading" >
        <HeroBody>
          <Container className="has-text-centered" style={{ textAlign: 'center', }}>
            <Button icon="fa fa-times" color="isWhite" isIconRight>Error</Button> 
          </Container>
        </HeroBody>
        {this.props.children}
      </Hero>
    );
  }
}

export default Loading;
