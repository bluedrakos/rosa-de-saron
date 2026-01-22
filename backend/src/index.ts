import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });

      if (publicRole) {
        const actions = [
          "api::reunion.reunion.find",
          "api::reunion.reunion.findOne",
          "api::reunion.reunion.create",
          "api::event.event.find",
          "api::event.event.findOne",
          "api::ministry.ministry.find",
          "api::ministry.ministry.findOne",
          "api::homepage.homepage.find",
          "api::blog-post.blog-post.find",
          "api::blog-post.blog-post.findOne",
          "api::team-member.team-member.find",
          "api::team-member.team-member.findOne",

          "api::about-page.about-page.find",
          "api::templo.templo.find",
          "api::templo.templo.findOne",
        ];

        await Promise.all(
          actions.map(async (action) => {
            const permission = await strapi
              .query("plugin::users-permissions.permission")
              .findOne({
                where: {
                  action,
                  role: publicRole.id,
                },
              });

            if (!permission) {
              await strapi.query("plugin::users-permissions.permission").create({
                data: {
                  action,
                  role: publicRole.id,
                },
              });
              strapi.log.info(`Permission created: ${action}`);
            }
          })
        );
      }
    } catch (e) {
      strapi.log.error("Bootstrap permissions error", e);
    }
  },
};
