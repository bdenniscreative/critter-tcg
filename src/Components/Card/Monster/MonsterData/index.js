/**
 * Dictionaries that stores all monster's data
 */
import { CARD_TYPE, ATTRIBUTE, SIDE, ENVIRONMENT } from '../../utils/constant';
import { card_meta } from '../../CardMeta';
import initialize_monster_card from '../MonsterType';

const get_my_monster_on_field = (environment) => {
    const current_monsters = environment[SIDE.MINE][ENVIRONMENT.MONSTER_FIELD];
    let count = 0;
    for (const monster of current_monsters) {
        if (monster.card) {
            count++
        }
    }
    return count
}

const model_can_normal_summon = (self, environment) => {
    if (environment.CAN_NOT_SUMMON) {
        return false;
    }
    // monsters in extra deck can't be normal summoned
    if (self.card_type == CARD_TYPE.MONSTER.FUSION) {
        return false;
    }


    // Normal and effect monsters with level less than 4 can be summoned, 5-6 can be summoned using 1 tribute, and 7 and higher needs 2
    if (self.level <= 4) {
        return true
    } else if (self.level > 4 && self.level < 7) {
        if (get_my_monster_on_field(environment) >= 1) {
            return true
        }
    } else if (self.level >= 7) {
        if (get_my_monster_on_field(environment) >= 2) {
            return true
        }
    }
}

const model_can_special_summon = (self, environment) => {
    return false
}

export const monster_database = {
    
    1: () => {
        let options = {
            key: 1,
            atk: 1600,
            def: 1400,
            name: 'Raccoon',
            level: 4,
            attribute: ATTRIBUTE.LIGHT,
            race: 'Warrior',
            description: 'abc',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    3: () => {
        let options = {
            key: 3,
            atk: 1200,
            def: 800,
            name: 'Fox',
            level: 3,
            attribute: ATTRIBUTE.FIRE,
            race: 'Warrior',
            description: 'A flame manipulator who was the first Elemental HERO woman. Her Burstfire burns away villainy.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    2: () => {
        let options = {
            key: 2,
            atk: 800,
            def: 2000,
            name: 'Deer',
            level: 4,
            attribute: ATTRIBUTE.EARTH,
            race: 'Warrior',
            description: 'An cost.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    4: () => {
        let options = {
            key: 4,
            atk: 1000,
            def: 1000,
            name: 'Bird',
            level: 3,
            attribute: ATTRIBUTE.WIND,
            race: 'Warrior',
            description: 'A winged Elemental HERO who wheels through the sky and manipulates the wind. His signature move, Featherbreak, gives villainy a blow from sky-high.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    5: () => {
        let options = {
            key: 5,
            atk: 2100,
            def: 1200,
            name: 'Bear',
            level: 2,
            attribute: ATTRIBUTE.WIND,
            race: 'Warrior',
            description: 'abc',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon,
            fusion_materials: [1, 2]
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    }

}