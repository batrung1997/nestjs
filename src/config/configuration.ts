import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ConfigurationType } from './configuration.type';

const YAML_CONFIG_FILENAME = 'config.yml';

export default () => {
  const data = yaml.load(
    readFileSync(join(process.cwd(), YAML_CONFIG_FILENAME), 'utf8'),
  );
  return data as ConfigurationType;
};
