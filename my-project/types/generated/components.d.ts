import type { Struct, Schema } from '@strapi/strapi';

export interface SkillSkills extends Struct.ComponentSchema {
  collectionName: 'components_skill_skills';
  info: {
    displayName: 'Skills';
    icon: 'rocket';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'skill.skills': SkillSkills;
    }
  }
}
