import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Orders from "@/components/shopping/Orders";
import Address from "@/components/shopping/Address";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Hero Image Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={accImg}
          alt="Account Overview"
        />
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 p-2 md:pl-32 md:pr-32">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            {/* Tabs List */}
            <TabsList className="mb-6">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;