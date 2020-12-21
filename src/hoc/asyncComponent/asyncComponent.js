import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null,
            spinner: false
        }

        componentDidMount() {
            this.setState({spinner: true})
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default})
                })
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;
