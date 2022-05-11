import { spec, specFinished, suiteFinished } from 'bddly';
import { State, Given, When, Then, And } from './app.e2e-bdd';

describe('AppController (e2e):', () => {
  const state = new State();
  const given = new Given(state);
  const when = new When(state);
  const then = new Then(state);
  const and = new And(state);

  beforeAll(async () => {
    await state.init();
  });

  afterEach(() => {
    specFinished(expect.getState().currentTestName);
  });

  afterAll(() => {
    suiteFinished(expect.getState().currentTestName, __filename);
  });

  spec('Test Get request', async () => {
    await when.aGetRequestIsMadeTo('/');
    then.theResponseTextIs('Hello World!');
    and.theResponseCodeIs(200);
  });

  spec('Order retrieval', async () => {
    given.anOrderExistsInTheDatabaseWithName('My order');
    await when.aRequestIsMadeForOrderByIndex(state.orderIndex);
    then.theResponseTextIs('My order');
    and.theResponseCodeIs(200);
  });
});
