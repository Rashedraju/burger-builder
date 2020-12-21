// import React, { Component } from 'react';
// import Modal from '../../components/UI/Modal/Modal';

// const withErrorHandler = (WrappedComponent, axios) => {
//   return class extends Component {
//     state = {
//       error: null,
//     };
//     componentDidMount() {
//       this.reqInterceptors = axios.interceptors.request.use((req) => {
//         this.setState({ error: null });
//         return req;
//       });
//       this.resInterceptors = axios.interceptors.response.use(
//         (res) => res,
//         (error) => {
//           this.setState({ error: error });
//         }
//       );
//     }

//     componentWillUnmount() {
//       axios.interceptors.request.eject(this.reqInterceptors);
//       axios.interceptors.response.eject(this.resInterceptors);
//     }

//     errorConfirmHandler = () => {
//       this.setState({ error: false });
//     };

//     render() {
//       if (this.state.error) {
//         // You can render any custom fallback UI
//         return (
//           <Modal show={this.state.error} disable={this.errorConfirmHandler}>
//             {this.state.error ? this.state.error.message : null}
//           </Modal>
//         );
//       }
//       return <WrappedComponent {...this.props} />;
//     }
//   };
// };

// export default withErrorHandler;

import React, { Component } from 'react';

const withErrorHandler = WrappedComponnet => {

  return class extends Component {
    state = {
      errorInfo: null,
      error: null,
    };
  
    static getDerivedStateFromError () {
      
    }

    componentDidCatch(error) {
      this.setState({ error});
    }
  
    render() {
      if (this.state.errorInfo) {
        return (
          <h2 style={{ textAlign: 'center' }}> {this.state.error.message} </h2>
        );
      }
      return this.props.children;
    }
  }
}

export default withErrorHandler;