import Layout from "@/components/Layout";
import NoSSRWrapper from "@/components/NoSSRWrapper";
import { Button } from "@/ui/Button";
import Chip from "@/ui/Chip";
import Dropdown from "@/ui/Dropdown";
import { GradientContainer } from "@/ui/GradientContainer";
import { Input, TextArea } from "@/ui/Input";
import Photo from "@/ui/Photo";
import SelectBox from "@/ui/SelectBox";
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
    router.replace("/");
  };

  return (
    <NoSSRWrapper>
      <div className="flex flex-col items-center px-2">
        <div className="w-full max-w-screen-md"></div>
        <div className="flex w-full max-w-lg flex-col">
          <Spacer className="h-6" />
          <Photo className="w-1/2 self-center" />
          <Spacer className="h-6" />
          <Input
            id="real-name"
            autoComplete="off"
            placeholderLabel="Справжнє імʼя людини (якщо відомо)"
          />
          <SectionHeader title="Псевдоніми (до 10)" />
          <InputGroup
            count={2}
            builder={(i) => (
              <Input
                id={`nickname-${i}`}
                autoComplete="off"
                placeholderLabel={`Псевдонім ${i + 1}`}
              />
            )}
          />
          <SectionHeader title="Ставлення до війни" />
          <ViewOnWar />
          <SectionHeader title="Сфера діяльності" />
          <div className="flex flex-wrap gap-1.5">
            <Chip label="Блогер" selected={false} />
            <Chip label="Співак" selected={false} />
            <Chip label="Спортсмен" selected={true} />
            <Chip label="Актор" selected={false} />
            <Chip label="Інше" selected={true} />
          </div>
          <SectionHeader
            title="Посилання на ресурси людини (до 10)"
            subtitle="Telegram, Instagram, YouTube, TikTok..."
          />
          <InputGroup
            count={2}
            builder={(i) => (
              <Input
                id={`nickname-${i}`}
                autoComplete="off"
                placeholderLabel={`Посилання ${i + 1}`}
              />
            )}
          />
          <Spacer className="h-5" />
          <Dropdown
            placeholderLabel={"Національність (якщо відома)"}
            selected={undefined}
            options={["Українська", "Свиняча", "Інша"]}
          />
          <SectionHeader
            title={<div className="text-h3">Підтвердження позиції людини</div>}
            subtitle={
              <div className="text-h8">
                Заповніть хоча б{" "}
                <span className="font-bold">одне з полів нижче</span>.
              </div>
            }
          />
          <TextArea
            id="proof"
            placeholderLabel="Короткий опис дій людини"
            autoComplete="off"
          />
          <SectionHeader
            title="Посилання на докази (до 10)"
            subtitle="Посилання на відео, допис, статью і тд."
          />
          <InputGroup
            count={2}
            builder={(i) => (
              <Input
                id={`nickname-${i}`}
                autoComplete="off"
                placeholderLabel={`Посилання ${i + 1}`}
              />
            )}
          />
          <SectionHeader
            title="Фотопідтвердження доказів (до 10)"
            subtitle="Фото або скріни на яких видно ставлення людини до війни в Україні"
          />
          <div className="grid grid-cols-2 gap-2">
            <Photo />
            <Photo />
            <Photo />
          </div>
          <Spacer className="h-10" />
          <GradientContainer>
            <div className="flex flex-col px-4 py-5 text-h8">
              <div className="text-h4">Про додавання</div>
              <br />
              <p>
                Після додавання людини, вона буде перевірена адміном і додана на
                сайт.
              </p>
              <br />
              <p>
                Якщо бажаєте{" "}
                <span className="font-bold">отримати сповіщення</span>, коли
                адмін перевірить додану вами людини, будь ласка, залишіть ваш
                email.
              </p>
              <br />
              <Input placeholderLabel="Ваш email (необовʼязково)" />
            </div>
          </GradientContainer>
          <Spacer className="h-10" />
          <Button onClick={handleSubmit}>Додати</Button>
          <Spacer className="h-10" />
        </div>
      </div>
    </NoSSRWrapper>
  );
};

AddTarget.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddTarget;

function SectionHeader(props: {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
}) {
  return (
    <div className="pt-6 pb-3">
      <h2 className="text-h5">{props.title}</h2>
      {props.subtitle && (
        <>
          <Spacer className="h-1" />
          <p className="text-h8 opacity-50">{props.subtitle}</p>
        </>
      )}
    </div>
  );
}

function InputGroup(props: {
  count: number;
  builder: (i: number) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: props.count }, (_, i) => props.builder(i))}
    </div>
  );
}

function ViewOnWar() {
  // function handleClick(e: React.MouseEvent, value: string) {
  //   e.preventDefault();
  //   console.log(value);
  // }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <SelectBox
          label={"За Україну 🇺🇦"}
          selected={false}
          className="grow py-5"
        />
        <SelectBox
          label={"За росію 🇷🇺"}
          selected={false}
          className="grow py-5"
        />
      </div>
      <SelectBox
        label={"За мір во всьом мірє 🤡"}
        selected={false}
        className="py-5"
      />
      <SelectBox label={"Мовчить 😬"} selected={false} className="py-5" />
    </div>
  );
}
