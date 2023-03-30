import React from 'react';
import '../Monster/MonsterView.css'
/**
 * View container for a monster card
 */
class SpellView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {card, style} = this.props;
        if (card) {
            return (
                <img style = {style} className="field_card" key={`card_${card.unique_count}`} src={card.key+'.png'}/>
            )
        } 
    }

}

export default SpellView;
