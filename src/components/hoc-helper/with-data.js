import React, {Component} from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";

const withData = (View, getData) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false,
    };

    componentDidMount() {

      this.onLoading();
      getData()
        .then((data) => {
          this.setState({
            data,
          });
        })
        .catch(this.onError);

    }

    onError = () => {
      this.setState({
        loading: false,
        error: true,
      });
    }

    onLoading = () => {
      this.setState({
        loading: true,
        error: false,
      });
    }

    render() {
      const { data,  error, loading } = this.state;

      if (!data && !error) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} data={data}/>;
    }
  };
};

export default withData;