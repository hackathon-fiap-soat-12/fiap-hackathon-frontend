import * as React from 'react';
const SortIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <path fill="#67757C" d="m4 2.5 4 4H0l4-4Z" />
    <path fill="#777E89" fillOpacity={0.12} d="m4 11.5 4-4H0l4 4Z" />
  </svg>
);
export default SortIcon;
