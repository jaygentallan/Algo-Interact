import React from "../../../node_modules/react";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div class="box">
      <div class="d-flex p-5 bd-highlight">
        <div class="d-flex p-5 bd-highlight">
          <h5 class="display-4 text-center">
            Algo-Interact was created to visualize data structures and
            algorithms for computer science students and anyone curious to
            learn.{" "}
            <a href="#" class="try">
              Try it out!
            </a>
          </h5>
        </div>
      </div>

      <hr></hr>

      <div class="d-flex p-2 bd-highlight">
        <div class="pl-5 pb-2">
          <h2> Data Structures </h2>
        </div>
      </div>

      <div class="d-flex pl-5 pr-5 bd-highlight">
        <div class="card-deck">
          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>

          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <hr></hr>
      <div class="d-flex pl-2 bd-highlight">
        <div class="pl-5 pt-3 pb-4">
          <h2> Algorithms </h2>
        </div>
      </div>

      <div class="d-flex pl-5 pr-5 pb-5 bd-highlight">
        <div class="card-deck">
          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>

          <div class="card">
            <img
              class="card-img-top"
              src=".../100px200/"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container p-5"></div>

      <Footer />
    </div>
  );
};

export default Home;
