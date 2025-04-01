import * as React from 'react';

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="#67757C"
    {...props}
  >
    <path d="M25 9v1.778h-.889l-4.444 6.666V25h-5.334v-7.556L9.89 10.778H9V9h16Zm-12.975 1.778 4.086 6.128v6.316h1.778v-6.316l4.085-6.128h-9.949Z" />
  </svg>
);

export default FilterIcon;
