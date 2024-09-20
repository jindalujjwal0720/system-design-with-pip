export interface NavigationItem {
  title?: string;
  path?: string;
  children?: NavigationItem[];
}

interface Config {
  navigation: NavigationItem[];
}
