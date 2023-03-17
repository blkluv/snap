import { motion } from 'framer-motion'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/config/design'

import { LinkComponent } from '../shared/link-component'
import { ThemeToggle } from '../shared/theme-toggle'

export default function Dropdown() {
  return (
    <motion.div className="relative inline-block text-left text-neutral-700" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover>
        <PopoverTrigger>
          <button className="bg-card flex items-center justify-center overflow-hidden rounded-md p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 ">
            Menu
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full rounded-md p-2">
            <LinkComponent className="mb-2 flex items-center" href="/create">
              <button className="btn btn-pill bg-gradient-button">
                <span className="px-2">Create</span>
              </button>
            </LinkComponent>
            <LinkComponent className="mb-2 flex items-center" href="/collected">
              <button className="btn btn-pill bg-gradient-button-green">
                <span className="px-2">Collected</span>
              </button>
            </LinkComponent>
            <ThemeToggle />
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
