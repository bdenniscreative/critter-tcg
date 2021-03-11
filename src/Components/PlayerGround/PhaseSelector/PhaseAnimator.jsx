import React from 'react';
import { connect } from 'react-redux';
import { PHASE, PHASE_START} from '../utils/constant'
import './PhaseSelector.css';

class PhaseAnimator extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            phaseClass: 'phase_before'
        }
    }

    componentDidMount() {
        if (this.props.game_meta.current_phase == PHASE_START) {
            this.setState({phaseClass: ''}, () => {
                setTimeout(()=>{this.setState({phaseClass: 'phase_after'})}, 2000)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.phaseClass == '') {
            
        }
    }

    render() {
        const { game_meta } = this.props; 

        return(
            <div className = {`phase_block ${this.state.phaseClass}`}>
                <h1>{game_meta.current_phase}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    const { game_meta } = state.gameMetaReducer;
    return { environment, game_meta};
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhaseAnimator);