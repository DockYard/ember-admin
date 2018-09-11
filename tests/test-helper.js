import Application from '../app';
import config from '../config/environment';
import { setApplication, setResolver } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import resolver from './helpers/resolver';

setResolver(resolver);

setApplication(Application.create(config.APP));

start();
