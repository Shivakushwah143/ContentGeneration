'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const TilesComponent = ({ 
  className, 
  rows: r, 
  cols: c 
}: { 
  className?: string; 
  rows?: number; 
  cols?: number 
}) => {
  const rows = new Array(r || 30).fill(1)
  const cols = new Array(c || 20).fill(1)

  return (
    <div className={cn(
      'relative z-0 flex w-full h-full justify-center',
      className
    )}>
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="w-9 h-9 md:w-12 md:h-12 border-l border-neutral-200 dark:border-neutral-800 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: 'hsl(var(--tile))',
                transition: { duration: 0 }
              }}
              animate={{
                transition: { duration: 2 }
              }}
              key={`col-${j}`}
              className="w-9 h-9 md:w-12 md:h-12 border-r border-t border-neutral-200 dark:border-neutral-800 relative"
            />
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export const Tiles = React.memo(TilesComponent)