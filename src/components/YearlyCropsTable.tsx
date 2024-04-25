import { useEffect, useId, useState } from 'react'
import { cropsData } from '../data/cropsData'
import { Table, px } from '@mantine/core';
import { Crops } from '../interfaces/crops.interface';
import { yearlyData } from '../interfaces/crops.interface';

export default function YearlyCropsTable() {
  const [data,setData] = useState<yearlyData>({})  

   //grouping fcn : grouping by Year
  const yearlyCrops = (crops: Crops[]) => {
    return crops.reduce((acc,val) => {
      const groupKey = val['Year' as keyof Crops]
      if(!acc[groupKey]){
        acc[groupKey] = [];
      }
      acc[groupKey].push(val['Crop Production (UOM:t(Tonnes))'] === "" ? 0 : val['Crop Production (UOM:t(Tonnes))']);
      return acc;
    }, {} as any)
  }

  const rows = Object.keys(data).map((year) => (
    <Table.Tr key={year}>
      <Table.Td width='30%' > {year.split(', ')[1]} </Table.Td>
      <Table.Td width='30%' > {Math.max(...data[year])} </Table.Td>
      <Table.Td width='30%' > {Math.min(...data[year])}</Table.Td>
    </Table.Tr>
  ))

  useEffect(() => {
    const newData = yearlyCrops(cropsData);
    setData(newData);
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
        <Table.Thead >
          <Table.Tr>
            <Table.Th>
              Year
            </Table.Th>
            <Table.Th>
              Crop with Maximum Production in that Year (UOM:t(Tonnes))
            </Table.Th>
            <Table.Th>
              Crop with Minimum Production in that Year (UOM:t(Tonnes))
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
  )
}
