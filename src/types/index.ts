export interface Example {
  description: string;
  config: string;
  file: string;
}
export interface Option {
  name: string;
  description: string;
  ignoreCase: boolean;
  examples: Example[];
}
export interface Cmd extends Option {
  options: Option[];
}

export interface Directive extends Cmd {}
export interface Meta {
  name: string;
  slug: string;
  paths: string[];
  description: string;
  website: string;
  features: string[];
  use_cases: string[];
}
