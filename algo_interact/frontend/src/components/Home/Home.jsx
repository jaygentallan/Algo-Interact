import React from "../../../node_modules/react";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import "./Home.css";
import { ScrollRotate } from 'react-scroll-rotate';

const Home = () => {
  return (
    <div class="box">
      <div class="logo text-center">
      <ScrollRotate animationDuration={0.5}>
          <img 
            src={"/project_logo3.png"} 
            width={300} 
            height={300} 
            alt="logo" 
            class="pt-5"
          />
        </ScrollRotate>
      </div>
      <div class="d-flex p-5 bd-highlight">
        <div class="d-flex p-5 bd-highlight">
          <h5 class="display-4 text-center">
            Algo-Interact was created to visualize data structures and
            algorithms for computer science students and anyone curious to
            learn.{" "}
            <a href="/visualizer" class="try">
              Try it out!
            </a>
          </h5>
        </div>
      </div>

      <hr></hr>

      <div class="d-flex p-2 bd-highlight">
        <div class="pl-5 pb-2">
          <h2> <em>Data Structures</em> </h2>
        </div>
      </div>
      <div class="d-flex pl-5 pr-5 bd-highlight">
        <div class="card-deck">
          <Card 
            title="Test Card – Nowitzki Stats" 
            text="Dirk Nowitzki is a retired NBA player.
              He spent his 21 years in the league playing for the
              Dallas Mavericks, and he has made over 30,000 points."
            image="/test-dirk.png"
            link="/visualizer"
          />
          <Card 
            title="Tree"
            text="Description for tree here."
            link="/visualizer"
          />

          <Card 
            title="Linked List"
            text="Description for linked list here."
            link="/visualizer"
          />
          <Card 
            title="Graph"
            text="Description for a graph here."
            link="/visualizer"
          />
        </div>
      </div>

      <br></br>
      <br></br>
      <hr></hr>
      <div class="d-flex pl-2 bd-highlight">
        <div class="pl-5 pt-3 pb-4">
          <h2> <em>Algorithms</em> </h2>
        </div>
      </div>

      <div class="d-flex pl-5 pr-5 pb-5 bd-highlight">
        <div class="card-deck">
          <Card 
              title="Algorithm 1"
              text="Description for first algorithm here."
              link="/learn"
            />
          <Card 
            title="Algorithm 2"
            text="Description for second algorithm here."
            link="/learn"
          />
          <Card 
            title="Algorithm 3"
            text="Description for third algorithm here."
            link="/learn"
          />

          <Card 
            title="Algorithm 4"
            text="Description for fourth algorithm here."
            link="/learn"
          />
        </div>
      </div>

      <div class="container p-5"></div>

      <Footer />
    </div>
  );
};

export default Home;
