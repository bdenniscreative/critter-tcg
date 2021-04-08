/**
 * Dictionaries that stores all monster's data
 */
import { CARD_TYPE, ATTRIBUTE, SIDE, ENVIRONMENT } from '../../utils/constant';

import { card_meta } from '../../CardMeta';
import initialize_spell_card from '../SpellType';
import Core from '../../../../Core'
import { CARD_SELECT_TYPE } from '../../../PlayerGround/utils/constant';
import store from '../../../../Store/store';

import {update_environment} from '../../../../Store/actions/environmentActions'
import { NORMAL_SUMMON } from '../../../../Store/actions/actionTypes';

export const spell_database = {
    // Polymerization
    24094653: () => {
        let options = {
            key: 24094653,
            name: 'Polymerization',
            description: 'Fusion Summon 1 Fusion Monster from your Extra Deck, using monsters from your hand or field as Fusion Material.',
        }
        const spell = initialize_spell_card[card_meta[options.key].card_type](options);
        spell.effects = []
        //---------------Effect 1
        let effect1 = Core.Effect.createEffect()
        effect1.category = undefined;
        effect1.type = Core.Constant.effect_constant.EFFECT_TYPE_ACTIVATE;
        effect1.chain = 'EVENT_FREE_CHAIN'
        effect1.condition = (environment) => {
            // filter all fusion monsters out of the extra deck
            for (let fusion_monster_env of Core.Utils.get_cards_by_filter_and_location(environment, ENVIRONMENT.EXTRA_DECK, Core.Utils.is_fusion_monster)) {
                // returns true if the fustion materials are existed 
                return (Core.Utils.cards_existed(environment, fusion_monster_env.card.fusion_materials, [ENVIRONMENT.HAND, ENVIRONMENT.MONSTER_FIELD])) 
            }
        }

        effect1.target = (environment, src, tools) => {

            return new Promise((resolve, reject) => {
                const info_card_selector = {
                    resolve: resolve,
                    reject: reject,
                    type: CARD_SELECT_TYPE.CARD_SELECT_SPECIAL_SUMMON_MATERIALS,
                    materials: Core.Utils.get_fusion_material(environment, src),
                    // TODO: CHANGE TO actual num
                    num_to_select: 2
                }
                tools.call_card_selector(info_card_selector)
            })
        }

        effect1.operation = (environment, tools) => {
            // call card selector
            return new Promise((resolve, reject) => {
                const info_card_selector = {
                    resolve: resolve,
                    reject: reject,
                    type: CARD_SELECT_TYPE.CARD_SELECT_SPECIAL_SUMMON_TARGET
                }
                tools.call_card_selector(info_card_selector)
            }).then((result) => {
                effect1.target(environment, result.cardEnvs[0], tools).then((fusion_materials) => {
                    for (const material of fusion_materials.cardEnvs) {
                        // const { unique_id, location } = material
                        console.log(material)
                        environment = Core.Utils.move_cards_to_graveyard([material], SIDE.MINE, ENVIRONMENT.HAND, environment)
                    }
                    //force update
                    console.log(environment)
                    store.dispatch(update_environment(environment))
    
                    const info = {
                        card: Core.Utils.get_cardEnv_by_unique_id(environment, SIDE.MINE, ENVIRONMENT.EXTRA_DECK, result.cardEnvs[0]),
                        src_location: ENVIRONMENT.EXTRA_DECK,
                        side: SIDE.MINE
                    }
    
                    // TODO: change to fusion summon
                    Core.Summon.summon(info, NORMAL_SUMMON, environment)
                })
            })
        }

        spell.effects.push(effect1)
        //---------------End Effect 1
        return spell
    }
}