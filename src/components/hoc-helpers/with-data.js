import React, {Component, Fragment} from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false,
    };

    componentDidMount() {

      this.onLoading();
      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false,
            error: false,
          });
        })
        .catch(this.onError);

    }

    onLoading = () => {
      this.setState({
        loading: true,
        error: false,
      });
    }

    onError = () => {
      this.setState({
        loading: false,
        error: true,
      });
    }

    render() {
      const { data,  error, loading } = this.state;

      const viewData = <View {...this.props} data={data} />;

      const errorMessage = error ? <ErrorIndicator /> : null;
      const spinner = loading ? <Spinner /> : null;
      const view = !(error || loading) ? viewData : null;

      return (
        <Fragment>
          {view}
          {errorMessage}
          {spinner}
        </Fragment>
      );
    }


  };
};

export default withData;