import type { ReactNode } from 'react';

export type FooterProps = {
  children?: ReactNode;
};
export const Footer = ({ children }: FooterProps) => (
  <footer className="w-full flex justify-center items-center gap-2 px-8 py-6">
    {children}
    <div className="text-neutral-subtlest">
      Made by{' '}
      <a
        href="https://twitter.com/ponjimon"
        rel="noopener noreferrer"
        className="text-blue-700 hover:underline"
      >
        Ponjimon
      </a>
    </div>
  </footer>
);
