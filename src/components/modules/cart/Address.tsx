'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cities } from '@/constants';
import {
  // citySelector,
  // shippingAddressSelector,
  updateCity,
  updateShippingAddress,
} from '@/redux/features/cartSlice';
import {
  useAppDispatch,
  // useAppSelector
} from '@/redux/hooks';

export default function Address() {
  const dispatch = useAppDispatch();
  // const selectedCity = useAppSelector(citySelector);
  // const shippingAddress = useAppSelector(shippingAddressSelector);

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Address</h1>
        <p className="text-gray-500">Enter your address.</p>
        <div className="mt-5" id="city-select">
          <Select onValueChange={city => handleCitySelect(city)}>
            <SelectTrigger className="mb-5 placeholder:text-primary placeholder:bg-secondary">
              <SelectValue
                className="placeholder:text-primary placeholder:bg-secondary"
                placeholder="Select a city"
              />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-primary">
              {cities.map(city => (
                <SelectItem
                  key={city}
                  value={city}
                  className="text-primary bg-secondary"
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            className="bg-secondary text-primary placeholder:text-primary placeholder:bg-secondary"
            placeholder="Enter your shipping address"
            onChange={e => handleShippingAddress(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
