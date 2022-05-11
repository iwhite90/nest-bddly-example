import { Step, suiteStart, report, interestingGiven } from 'bddly';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { ServiceStub } from './service-stub';
import { name } from '../package.json';

const appService = new ServiceStub();

export class State {
  app: INestApplication;

  responseCode: number;
  responseText: string;
  orderIndex: number;

  async init() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    suiteStart(name);

    this.app = moduleFixture.createNestApplication();
    await this.app.init();
  }
}

export class Given {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  @Step
  anOrderExistsInTheDatabaseWithName(orderName: string) {
    this.state.orderIndex = appService.addOrder(orderName);

    interestingGiven(
      'Order',
      JSON.stringify(
        { name: orderName, index: this.state.orderIndex },
        null,
        2,
      ),
    );
  }
}

export class When {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  @Step
  async aGetRequestIsMadeTo(path: string) {
    const { status, text } = await request(this.state.app.getHttpServer()).get(
      path,
    );
    this.state.responseCode = status;
    this.state.responseText = text;
  }

  @Step
  async aRequestIsMadeForOrderByIndex(index: number) {
    const requestPath = '/orders/' + index;
    const { status, text } = await request(this.state.app.getHttpServer()).get(
      requestPath,
    );
    interestingGiven('Request', 'GET ' + requestPath);
    this.state.responseCode = status;
    this.state.responseText = text;
  }
}

export class Then {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  @Step
  theResponseTextIs(name: string) {
    report('Response', JSON.stringify(this.state.responseText, null, 2));
    expect(this.state.responseText).toBe(name);
  }
}

export class And {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  @Step
  theResponseCodeIs(expected: number) {
    report('Response code', this.state.responseCode.toString());
    expect(this.state.responseCode).toBe(expected);
  }
}
