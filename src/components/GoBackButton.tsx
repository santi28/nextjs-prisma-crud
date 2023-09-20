'use client';

import { IconArrowLeft } from "@tabler/icons-react";

function GoBackButton() {
  const handleGoBack = () => {
    window.history.back();
  }

  return ( 
    <button className="p-2 rounded-lg hover:bg-neutral-800" onClick={handleGoBack}>
      <IconArrowLeft size={20} />
    </button>
  )
}

export default GoBackButton