import express from 'express';
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
// We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }: { expressApp: express.Application }): Promise<void> => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const models = [
    {
      name: 'ValidatorHistory',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/validatorHistory').default,
    },
    {
      name: 'TotalRewardHistory',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/totalRewardHistory').default,
    },
    {
      name: 'AccountIdentity',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/accountIdentity').default,
    },
    {
      name: 'Validators',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/validators').default,
    },
    {
      name: 'NominatorHistory',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/nominatorHistory').default,
    },
    {
      name: 'ActiveNominators',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/activeNominators').default,
    },
    {
      name: 'ValidatorIdentity',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/validatorIdentity').default,
    },
    {
      name: 'Council',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/council').default,
    },
    {
      name: 'CouncilIdentity',
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      model: require('../models/councilIdentity').default,
    },
  ];

  await dependencyInjectorLoader({
    mongoConnection,
    models,
  });

  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
