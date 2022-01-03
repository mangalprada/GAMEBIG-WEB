import { FC } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

const PageFAQ: FC = () => {
  return (
    <Accordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      className="bg-gray-800/50 rounded-md shadow-md md:w-11/12 w-full mx-auto"
    >
      {/** Item 1 */}
      <Accordion.Item
        value="item-1"
        className={'items-center hover:bg-gray-500/10 rounded-t-md'}
      >
        <Accordion.Trigger
          className={
            'flex justify-start w-full px-4 overflow-hidden cursor-pointer'
          }
        >
          <span
            className={
              'py-3 text-xl text-gray-400 text-left font-semibold tracking-wide'
            }
          >
            What is page and who is it for?
          </span>
        </Accordion.Trigger>
        <Accordion.Content
          className={
            'flex justify-start w-full border-b-2 border-gray-600 cursor-default'
          }
        >
          <span
            className={
              'text-lg text-gray-500 tracking-tight py-3 text-left px-4 ' +
              'border-l-4 border-gray-500'
            }
          >
            Pages are places where event organizers can organize events and
            clans can connect with their fans and build their community.
          </span>
        </Accordion.Content>
      </Accordion.Item>

      {/** Item 2 */}
      <Accordion.Item
        value="item-2"
        className={'items-center hover:bg-gray-500/10 rounded-b-md '}
      >
        <Accordion.Trigger
          className={'flex justify-start w-full overflow-hidden cursor-pointer'}
        >
          <span
            className={
              'py-3 text-xl text-gray-400 text-left font-semibold tracking-wide px-4 '
            }
          >
            How do I use it?
          </span>
        </Accordion.Trigger>
        <Accordion.Content
          className={'flex justify-start w-full cursor-default'}
        >
          <ol
            className={
              'text-lg text-gray-500 tracking-tight py-3 text-left ' +
              'border-l-4 border-gray-500 px-4 '
            }
            type="1"
          >
            <li>
              1. Give your organization&apos;s details and we will create a page
              for you.
            </li>
            <li>2. Then you can start organizing events.</li>
          </ol>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default PageFAQ;
