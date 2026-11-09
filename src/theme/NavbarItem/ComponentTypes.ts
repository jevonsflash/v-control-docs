/**
 * Swizzle 包装（wrap 模式）：在原有导航栏项类型注册表的基础上，
 * 注册自定义类型 'custom-githubStar'（带 star 数的 GitHub 按钮）。
 */
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import CustomGithubStar from './CustomGithubStar';

export default {
  ...ComponentTypes,
  'custom-githubStar': CustomGithubStar,
};
