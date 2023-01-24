import Layout from "@/components/Layout";
import NoSSRWrapper from "@/components/NoSSRWrapper";
import { prisma } from "@/server/db/client";
import { Button } from "@/ui/Button";
import Chip from "@/ui/Chip";
import Dropdown from "@/ui/Dropdown";
import { GradientContainer } from "@/ui/GradientContainer";
import { Input, InputField, TextArea } from "@/ui/Input";
import Photo from "@/ui/Photo";
import SelectBox from "@/ui/SelectBox";
import Spacer from "@/ui/Spacer";
import type { Prisma } from "@prisma/client";
import { Field, Form, Formik, FormikErrors } from "formik";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewOnWarCode } from "shared/common_types";
import type { NextPageWithLayout } from "./_app";

interface AddTargetProps {
  jobs: Prisma.JobSelect[];
  nationalities: Prisma.NationalitySelect[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobs = await prisma?.job.findMany();
  const nationalities = await prisma?.nationality.findMany();

  return {
    props: {
      jobs,
      nationalities,
    },
  };
};

interface AddTargetForm {
  photo: string;
  realName: string;
  nicknames: string[];
  viewOnWar?: ViewOnWarCode;
  jobs: string[];
  resources: string[];
  summary: string;
  links: string[];
  photos: string[];
}

const AddTarget: NextPageWithLayout<AddTargetProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  // usePreventNavigation(router, unsavedChanges, "You have unsaved changes");

  const handleSubmit: React.MouseEventHandler = (e) => {
    e.preventDefault();
    // setUnsavedChanges(false);
    // router.replace("/");
  };

  const initialValues: AddTargetForm = {
    photo: "",
    realName: "",
    nicknames: [],
    viewOnWar: ViewOnWarCode.WITH_UKRAINE,
    jobs: [],
    resources: [],
    summary: "",
    links: [],
    photos: [],
  };

  console.log(props.jobs);
  console.log(props.nationalities);

  const validate = (values: AddTargetForm) => {
    const errors: FormikErrors<AddTargetForm> = {};

    if (!values.realName) {
      console.log("realName is required");
      errors.realName = "Required";
    }

    return errors;
  };

  return (
    <NoSSRWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
        }}
        validate={validate}
        validateOnBlur={true}
      >
        <Form>
          <div className="flex flex-col items-center px-2">
            <div className="w-full max-w-screen-md"></div>
            <div className="flex w-full max-w-lg flex-col">
              <Spacer className="h-6" />
              <Photo className="w-1/2 self-center" />
              <Spacer className="h-6" />
              <Field
                id="realName"
                name="realName"
                component={InputField}
                autoComplete="off"
                placeholderLabel={t("page.add-target.real-name")}
              />
              <SectionHeader
                title={t("page.add-target.section-header.nickname")}
              />
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
              <SectionHeader
                title={t("page.add-target.section-header.view-on-war")}
              />
              <ViewOnWar />
              <SectionHeader title={t("page.add-target.section-header.job")} />
              <div className="flex flex-wrap gap-1.5">
                <Chip label="Блогер" selected={false} />
                <Chip label="Співак" selected={false} />
                <Chip label="Спортсмен" selected={true} />
                <Chip label="Актор" selected={false} />
                <Chip label="Інше" selected={true} />
              </div>
              <SectionHeader
                title={t("page.add-target.section-header.resourses")}
                subtitle={t(
                  "page.add-target.section-header.resourses.subtitle"
                )}
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
                placeholderLabel={t(
                  "page.add-target.section-header.nationality"
                )}
                selected={undefined}
                options={["Українська", "Свиняча", "Інша"]}
              />
              <SectionHeader
                title={
                  <div className="text-h3">Підтвердження позиції людини</div>
                }
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
                title={t("page.add-target.section-header.evidence")}
                subtitle={t("page.add-target.section-header.evidence.subtitle")}
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
                    Після додавання людини, вона буде перевірена адміном і
                    додана на сайт.
                  </p>
                  <br />
                  <p>
                    Якщо бажаєте{" "}
                    <span className="font-bold">отримати сповіщення</span>, коли
                    адмін перевірить додану вами людини, будь ласка, залишіть
                    ваш email.
                  </p>
                  <br />
                  <Input placeholderLabel="Ваш email (необовʼязково)" />
                </div>
              </GradientContainer>
              <Spacer className="h-10" />
              <Button type="submit">Додати</Button>
              <Spacer className="h-10" />
            </div>
          </div>
        </Form>
      </Formik>
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
  const { t } = useTranslation();
  // function handleClick(e: React.MouseEvent, value: string) {
  //   e.preventDefault();
  //   console.log(value);
  // }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <SelectBox
          label={t(`ViewOnWarCode.${ViewOnWarCode.WITH_UKRAINE}`)}
          selected={false}
          className="grow py-5"
          onClick={() => console.log(ViewOnWarCode.WITH_UKRAINE)}
        />
        <SelectBox
          label={t(`ViewOnWarCode.${ViewOnWarCode.WITH_ORKY}`)}
          selected={false}
          className="grow py-5"
          onClick={() => console.log(ViewOnWarCode.WITH_ORKY)}
        />
      </div>
      <SelectBox
        label={t(`ViewOnWarCode.${ViewOnWarCode.PEACE_DEATH}`)}
        selected={false}
        className="py-5"
        onClick={() => console.log(ViewOnWarCode.PEACE_DEATH)}
      />
      <SelectBox
        label={t(`ViewOnWarCode.${ViewOnWarCode.QUIET}`)}
        selected={false}
        className="py-5"
        onClick={() => console.log(ViewOnWarCode.QUIET)}
      />
    </div>
  );
}
