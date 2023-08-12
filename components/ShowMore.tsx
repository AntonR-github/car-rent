"use client";

import CustomButton from './CustomButton';
import { ShowMoreProps } from "@/types";


const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {


  const handleNavigation = () => {
    // Calculate the new limit based on the page number and navigation type
    const newLimit = (pageNumber + 1) * 10;

    setLimit(newLimit); // Update the limit state
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
