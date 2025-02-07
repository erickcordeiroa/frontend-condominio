import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash, PlusCircleIcon } from "lucide-react";

interface IProperty {
  id: number;
  number: string;
  block: string;
  owner: string;
  description: string;
}

const property: IProperty[] = [
  { id: 1, number: "101", block: "A", owner: "João Silva", description: "Apartamento com 2 quartos" },
  { id: 2, number: "202", block: "B", owner: "Maria Souza", description: "Apartamento com 3 quartos" },
  { id: 3, number: "303", block: "C", owner: "Carlos Pereira", description: "Apartamento com 2 quartos" },
];

export default function ListProperty() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Apartamentos</h2>
        <Button><PlusCircleIcon /> Cadastrar novo </Button>
      </div>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Número</TableHead>
            <TableHead >Bloco</TableHead>
            <TableHead >Proprietário</TableHead>
            <TableHead >Descrição</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {property.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.block}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="flex flex-row justify-center gap-3">
                <Button variant="outline" size="default" >
                  <Pencil className="w-4 h-4" /> Editar
                </Button>
                <Button variant="destructive" size="default">
                  <Trash className="w-4 h-4" /> Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
