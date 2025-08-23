"use client";

import { SocialIcon } from "react-social-icons";

export const Footer = () => {
  return (
    <footer className="bg-[var(--brand-color-dark)]">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600">
              <svg
                className="h-8"
                viewBox="0 0 118 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </div>

            <p className="text-4xl text-white font-bold">Brewnest</p>

            <p className="mt-4 max-w-xs text-white">
              This website was created as part of my{" "}
              <span className="font-semibold">personal portfolio</span>. Feel
              free to check out the code and other projects on my GitHub below!
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <SocialIcon
                  network="github"
                  href="https://github.com/yerim01"
                  style={{ height: 35, width: 35 }}
                  className="transition hover:opacity-75"
                />
              </li>

              <li>
                <SocialIcon
                  network="linkedin"
                  href="https://www.linkedin.com/in/yerim-moon/"
                  style={{ height: 35, width: 35 }}
                  className="transition hover:opacity-75"
                />
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-white">Services</p>

              <ul className="mt-6 space-y-4 text-sm text-white">
                <li>
                  <a href="#" className=" transition hover:opacity-75">
                    {" "}
                    1on1 Coaching{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className=" transition hover:opacity-75">
                    {" "}
                    Company Review{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className=" transition hover:opacity-75">
                    {" "}
                    Accounts Review{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    HR Consulting{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    SEO Optimisation{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Company</p>

              <ul className="mt-6 space-y-4 text-sm text-white">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Meet the Team{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Accounts Review{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm text-white">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Contact{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Live Chat{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm text-white">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Accessibility{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Returns Policy{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    {" "}
                    Refund Policy{" "}
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Hiring-3 Statistics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-white">
          &copy; 2025. Brewnest - Yerim Moon. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
