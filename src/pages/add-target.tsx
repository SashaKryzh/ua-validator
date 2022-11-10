import Layout from "@/components/Layout";
import Button from "@/ui/Button";
import { Input, Label } from "@/ui/Input";
import Spacer from "@/ui/Spacer";
import usePreventNavigation from "@/utils/hooks/usePreventNavigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { type NextPageWithLayout } from "./_app";

const AddTarget: NextPageWithLayout = () => {
  const router = useRouter();
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  usePreventNavigation(router, unsavedChanges, "You have unsaved changes");

  const handleSubmit: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setUnsavedChanges(false);
    // TODO: redirect to the page with email request
    router.replace("/");
  };

  return (
    <div className="flex flex-col items-center px-2">
      <div className="w-full max-w-screen-md"></div>
      <div className="flex w-full max-w-lg flex-col">
        <h1 className="text-2xl">Додавання людини</h1>
        <Spacer className="h-4" />
        <Label slug="real-name">Справжнє імʼя</Label>
        <Input
          id="real-name"
          autoComplete="off"
          placeholderLabel="Справжнє імʼя людини (якщо відомо)"
        />
        <Spacer className="h-4" />
        <Button onClick={handleSubmit}>Додати</Button>
      </div>
    </div>
  );
};

AddTarget.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddTarget;
