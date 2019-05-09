import React, {Component} from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import friend from "./friends.json";
import './App.css';

//Sets state to a 0 or empty
class App extends Component {

  state = {
    friend,
    clickedFriend: [],
    score: 0
  };

  // when you click on a card. the friend is taken out of the array

imageClick = event => {
  const currentFriend = event.target.event;
  const friendAlreadyClicked = this.state.clickedFriend.indexOf(currentFriend) > -1;

  // if you click on a friend that has already been selected, the game is reset and cards reordered.
  if (friendAlreadyClicked) {
    this.setState({
      friend: this.state.friend.sort(function(a, b) {
        return 0.5 - Math.random();
      }),
      clickedFriend: [],
      score: 0
      });
      alert("You lose. Play again?");
  
  // if you click on an available friend, your score is increased and cards reordered 
    } else {
      this.setState({
        friend: this.state.friend.sort(function(a, b){
          return 0.5 - Math.random();
        }),
        clickedFriend: this.state.clickedFriend.concat(
          currentFriend
        ),
        score: this.state.score + 1
      },

//if you get all 12 friend current you get a congrats message and the game resets
    () => {
      if (this.state.score === 12) {
        alert("Yay! You Win!");
        this.setState({
          friend: this.state.friend.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedFriend: [],
          score: 0
        });
      }
    }
  );
  }
};
//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
render() {
  return (
    <div>
      <Navbar 
        score={this.state.score}
      />
      <Jumbotron />
      <div className = "wrapper">
        {this.state.friend.map(friend => (
          <FriendCard
            imageClick={this.imageClick}
            id={friend.id}
            key={friend.id}
            image={friend.image}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
}

export default App;

