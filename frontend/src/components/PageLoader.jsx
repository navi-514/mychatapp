import React from 'react'
import { LoaderIcon } from "lucide-react";
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin h-8 w-8 text-gray-500" />
        PageLoader</div>
  )
}

export default PageLoader