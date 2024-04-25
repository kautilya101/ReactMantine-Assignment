import { Box, Container, Table } from '@mantine/core'
import { useEffect, useState } from 'react'
import { cropsData } from '../data/cropsData'
import { Crops } from '../interfaces/crops.interface';
import { yearlyData } from '../interfaces/crops.interface';

export default function AvgYieldTable() {

  const [data,setData] = useState<yearlyData>({})  

  //grouping fcn : grouping by crops
  const yearlyCrops = (crops: Crops[]) => {
    return crops.reduce((acc,val) => {
      const groupKey = val['Year' as keyof Crops]
      const yieldOfCrops = val['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] === "" ? 0 : val['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'];
      const cultivationArea = val['Area Under Cultivation (UOM:Ha(Hectares))'] === "" ? 0 : val['Area Under Cultivation (UOM:Ha(Hectares))'];
      if(!acc[groupKey]){
        acc[groupKey] = [];
        acc[groupKey].push( yieldOfCrops);
        acc[groupKey].push( cultivationArea);
      }
      acc[groupKey][0] += yieldOfCrops
      acc[groupKey][1] += cultivationArea
      return acc;
    }, {} as any)
  }

  // rows created with data fed to table body
  const rows = Object.keys(data).map((crop) => (
    <Table.Tr key={crop}>
      <Table.Td width='30%' >{crop.split(', ')[1]}</Table.Td>
      <Table.Td width='30%' >{(data[crop][0]/13).toFixed(3)}</Table.Td>
      <Table.Td width='30%' >{(data[crop][1]/13).toFixed(3)}</Table.Td>
    </Table.Tr>
  ))

  useEffect(() => {
    const newData = yearlyCrops(cropsData); 
    setData(newData); // fetching original data and constructing desired format
  },[])


  return (
      <Table 
        width='50%'
        withColumnBorders 
        borderColor='gray' 
        withTableBorder 
        verticalSpacing='md'
        horizontalSpacing="xl"
      >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                Year
              </Table.Th>
              <Table.Th>
              Average Yield of the Crop between 1950-2020 (UOM:Kg/Ha(KilogramperHectare))
              </Table.Th>
              <Table.Th>
              Average Cultivation Area of the Crop between 1950-2020 (UOM:Ha(Hectares))
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
  )
}
