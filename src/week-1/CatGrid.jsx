import React from "react";
import Loading from "./Loading";
import Cat from "./Cat";

const MIN_CATS_TO_FETCH = 5;
const CAT_URL = "https://api.thecatapi.com/v1/images/search?order=RAND&limit=";
const CAT_API_KEY =
  "live_4Z4WujHfPhTgYV9CTGLgu9d3c2NX35gdREMY4L3GOm5WNpYT3SEbTZCJOEIHPSwJ";

class CatGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      catArray: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.getMoreCats();
  }

  async getMoreCats() {
    this.setState({ isLoading: true });

    const reqOptions = {
      headers: {
        "x-api-key": CAT_API_KEY,
      },
    };

    const res = await fetch(CAT_URL + MIN_CATS_TO_FETCH, reqOptions);

    if (res.status !== 200) {
      return;
    }

    const data = await res.json();

    this.setState({
      catArray: [...this.state.catArray, ...data],
      isLoading: false,
    });
  }

  handleClick = () => {
    this.getMoreCats();
  };

  render() {
    return (
      <>
        <div className={"bg-light"} style={{ height: "100vh" }}>
          <div className="cats-header">
            <span className={"cats-title " + "title-light"}>CATS</span>
            <hr />
          </div>

          <br />

          <div className="cats-header">
            {this.state.catArray?.map((element, index) => {
              return <Cat key={element.id} url={element.url} id={index} />;
            })}
            {this.state.isLoading && <Loading />}

            <hr />
            <button className="cats-button" onClick={this.handleClick}>
              MORE CATS!
            </button>
            {/* <ThemeToggle themeUpdated={this.updateTheme} /> */}
          </div>
        </div>
      </>
    );
  }
}

export default CatGrid;
