import React from 'react';
import {
  useGitHubStars,
  formatStarCount,
} from '../../hooks/useGitHubStars';
import {GitHubIcon, StarIcon} from '../../components/GitHubIcons';

interface Props {
  href: string;
  label?: string;
  /** 移动端侧边导航菜单中渲染时为 true。 */
  mobile?: boolean;
}

/**
 * 自定义导航栏项（config 中 type: 'custom-githubStar'）：
 * GitHub 链接 + 实时 star 数徽章。
 */
export default function CustomGithubStar({
  href,
  label = 'GitHub',
  mobile = false,
}: Props): React.JSX.Element {
  const stars = useGitHubStars();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        mobile
          ? 'menu__link github-star-link'
          : 'navbar__item navbar__link github-star-link'
      }>
      <GitHubIcon className="github-star-link__icon" />
      <span>{label}</span>
      {stars !== null && (
        <span className="github-star-link__count" title={`${stars} stars`}>
          <StarIcon />
          {formatStarCount(stars)}
        </span>
      )}
    </a>
  );
}
