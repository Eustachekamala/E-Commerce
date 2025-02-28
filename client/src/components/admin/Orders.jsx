import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./Order-Details";

function AdminOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold">All Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</TableHead>
                                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order Date</TableHead>
                                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order Status</TableHead>
                                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order Price</TableHead>
                                <TableHead className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                    <span className="sr-only">Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="hover:bg-gray-50 transition-colors">
                                <TableCell className="px-4 py-3 text-sm text-gray-700">123456</TableCell>
                                <TableCell className="px-4 py-3 text-sm text-gray-700">28/02/2025</TableCell>
                                <TableCell className="px-4 py-3 text-sm text-gray-700">In Process</TableCell>
                                <TableCell className="px-4 py-3 text-sm text-gray-700">$2000</TableCell>
                                <TableCell className="px-4 py-3 text-right">
                                    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                        <Button
                                            onClick={() => setOpenDetailsDialog(true)}
                                            className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
                                        >
                                            View Details
                                        </Button>
                                        <AdminOrderDetailsView />
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdminOrders;