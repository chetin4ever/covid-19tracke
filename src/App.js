import React from "react"
import { Cards, Chart, CountryPicker } from "./components"
import styles from "./App.module.css"
import { fetchData } from "./api"
import coronaImage from "./images/image.png"

class App extends React.Component {
  state = {
    data: {},
    country: "",
  }
  async componentDidMount() {
    const fetcheddata = await fetchData()
    this.setState({ data: fetcheddata })
    console.log(this.state, "from mounted")
  }
  handleCountryChange = async (country) => {
    //fetch data
    const fetcheddata = await fetchData(country)
    console.log(fetcheddata, "specific country")
    //setdata
    this.setState({ data: fetcheddata, country: country })
  }
  render() {
    const { data, country } = this.state
    console.log(data, "from app")
    return (
      <div className={styles.container}>
        <img src={coronaImage} className={styles.image} alt='coronaImage'></img>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />

        <Chart data={data} country={country} />
      </div>
    )
  }
}
export default App
