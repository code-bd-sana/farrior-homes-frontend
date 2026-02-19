"use client";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

/**
 * Defines the filter state for property filter.
 * @typedef {Object} FilterState
 * @property {number[]} priceRange - The range of prices selected by the user.
 * @property {string} propertyType - The selected property type.
 * @property {string[]} location - The selected locations.
 * @property {number[]} squareFeet - The selected square feet sizes.
 * @property {number[]} bedrooms - The selected number of bedrooms.
 * @property {number[]} bathrooms - The selected number of bathrooms.
 */
interface FilterState {
  priceRange: [number, number];
  propertyType: string;
  location: string[];
  squareFeet: number[];
  bedrooms: number[];
  bathrooms: number[];
}

export default function PropertyFilter() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    propertyType: "All Property",
    location: [],
    squareFeet: [],
    bedrooms: [],
    bathrooms: [],
  });

  const [showPropertyType, setShowPropertyType] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showSquareFeet, setShowSquareFeet] = useState(true);
  const [showBedrooms, setShowBedrooms] = useState(true);
  const [showBathrooms, setShowBathrooms] = useState(true);

  /**
   * Applies the selected filters and logs them to the console.
   */
  const applyFilters = () => {
    console.log(filters);
  };

  /**
   * Clears all the selected filters and resets the filter state to default values.
   */
  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      propertyType: "All Property",
      location: [],
      squareFeet: [],
      bedrooms: [],
      bathrooms: [],
    });
  };

  return (
    <div className='w-[15  0px] md:w-[301px] p-6 border border-gray-300 rounded-lg'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-xl font-semibold'>Filters</h2>
        <button className='text-red-500 cursor-pointer' onClick={clearFilters}>
          Clear
        </button>
      </div>

      {/* Price Range Filter */}
      <div className='mb-4'>
        <label className='block font-semibold text-lg border-b-2 border-gray-300 mb-5 pb-2'>
          Price Range
        </label>
        <div className='flex justify-between items-center mt-2'>
          <div className='text-gray-500 text-sm'>${filters.priceRange[0]}</div>
          <div className='text-gray-500 text-sm'>${filters.priceRange[1]}</div>
        </div>
        <input
          type='range'
          min='0'
          max='10000'
          value={filters.priceRange[0]}
          onChange={(e) =>
            setFilters({
              ...filters,
              priceRange: [Number(e.target.value), filters.priceRange[1]],
            })
          }
          className='w-full bg-[#E0E0E0] h-2 rounded-lg'
        />
        <div className='flex'>
          <input
            type='number'
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]],
              })
            }
            className='w-1/2 border border-gray-300 rounded-md p-2 mt-2'
          />
          <input
            type='number'
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className='w-1/2 border border-gray-300 rounded-md p-2 mt-2 ml-2'
          />
        </div>
      </div>

      {/* Property Type Filter */}
      <div className='mb-4'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 pb-2'>
          <label className='block font-semibold text-lg'>Property Type</label>
          <button
            onClick={() => setShowPropertyType(!showPropertyType)}
            className='text-blue-500 flex items-center'>
            {showPropertyType ? (
              <ChevronUpIcon className='h-5 w-5' />
            ) : (
              <ChevronDownIcon className='h-5 w-5' />
            )}
          </button>
        </div>
        {showPropertyType && (
          <div className='flex flex-col mt-2'>
            {[
              "All Property",
              "Luxury Property",
              "Duplex Property",
              "Apartment",
            ].map((type) => (
              <label key={type} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='propertyType'
                  value={type}
                  checked={filters.propertyType === type}
                  onChange={() =>
                    setFilters({ ...filters, propertyType: type })
                  }
                  className='border-gray-300'
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className='mb-4'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 pb-2'>
          <label className='block font-semibold text-lg'>Location</label>
          <button
            onClick={() => setShowLocation(!showLocation)}
            className='text-blue-500 flex items-center'>
            {showLocation ? (
              <ChevronUpIcon className='h-5 w-5' />
            ) : (
              <ChevronDownIcon className='h-5 w-5' />
            )}
          </button>
        </div>
        {showLocation && (
          <div className='flex flex-col mt-2'>
            {[
              "Rampura",
              "Gulshan",
              "Banani",
              "Dhanmondi",
              "Khilgaon",
              "Mohammadpur",
            ].map((location) => (
              <label
                key={location}
                className='flex items-center space-x-2 mb-2'>
                <input
                  type='checkbox'
                  checked={filters.location.includes(location)}
                  onChange={() => {
                    if (filters.location.includes(location)) {
                      setFilters({
                        ...filters,
                        location: filters.location.filter(
                          (loc) => loc !== location,
                        ),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        location: [...filters.location, location],
                      });
                    }
                  }}
                  className='border-gray-300'
                />
                <span>{location}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Square Feet Filter */}
      <div className='mb-4'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 pb-2'>
          <label className='block font-semibold text-lg'>Square Feet</label>
          <button
            onClick={() => setShowSquareFeet(!showSquareFeet)}
            className='text-blue-500 flex items-center'>
            {showSquareFeet ? (
              <ChevronUpIcon className='h-5 w-5' />
            ) : (
              <ChevronDownIcon className='h-5 w-5' />
            )}
          </button>
        </div>
        {showSquareFeet && (
          <div className='flex flex-col mt-2'>
            {[3000, 2400, 2000, 1800, 1500, 1200].map((size) => (
              <label key={size} className='flex items-center space-x-2 mb-2'>
                <input
                  type='checkbox'
                  checked={filters.squareFeet.includes(size)}
                  onChange={() => {
                    if (filters.squareFeet.includes(size)) {
                      setFilters({
                        ...filters,
                        squareFeet: filters.squareFeet.filter(
                          (s) => s !== size,
                        ),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        squareFeet: [...filters.squareFeet, size],
                      });
                    }
                  }}
                  className='border-gray-300'
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bedrooms Filter */}
      <div className='mb-4'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 pb-2'>
          <label className='block font-semibold text-lg'>Bedrooms</label>
          <button
            onClick={() => setShowBedrooms(!showBedrooms)}
            className='text-blue-500 flex items-center'>
            {showBedrooms ? (
              <ChevronUpIcon className='h-5 w-5' />
            ) : (
              <ChevronDownIcon className='h-5 w-5' />
            )}
          </button>
        </div>
        {showBedrooms && (
          <div className='flex flex-col mt-2'>
            {[6, 5, 4, 3, 2, 1].map((bed) => (
              <label key={bed} className='flex items-center space-x-2 mb-2'>
                <input
                  type='checkbox'
                  checked={filters.bedrooms.includes(bed)}
                  onChange={() => {
                    if (filters.bedrooms.includes(bed)) {
                      setFilters({
                        ...filters,
                        bedrooms: filters.bedrooms.filter((b) => b !== bed),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        bedrooms: [...filters.bedrooms, bed],
                      });
                    }
                  }}
                  className='border-gray-300'
                />
                <span>{bed}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bathrooms Filter */}
      <div className='mb-4'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 pb-2'>
          <label className='block font-semibold text-lg'>Bathrooms</label>
          <button
            onClick={() => setShowBathrooms(!showBathrooms)}
            className='text-blue-500 flex items-center'>
            {showBathrooms ? (
              <ChevronUpIcon className='h-5 w-5' />
            ) : (
              <ChevronDownIcon className='h-5 w-5' />
            )}
          </button>
        </div>
        {showBathrooms && (
          <div className='flex flex-col mt-2'>
            {[6, 5, 4, 3, 2, 1].map((bath) => (
              <label key={bath} className='flex items-center space-x-2 mb-2'>
                <input
                  type='checkbox'
                  checked={filters.bathrooms.includes(bath)}
                  onChange={() => {
                    if (filters.bathrooms.includes(bath)) {
                      setFilters({
                        ...filters,
                        bathrooms: filters.bathrooms.filter((b) => b !== bath),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        bathrooms: [...filters.bathrooms, bath],
                      });
                    }
                  }}
                  className='border-gray-300'
                />
                <span>{bath}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className='w-full bg-[#619B7F] text-white p-2 rounded-md'>
        Apply Filters
      </button>
    </div>
  );
}
