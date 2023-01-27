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
import type { Job, Nationality } from "@prisma/client";
import type { FieldProps, FormikErrors } from "formik";
import { Field, FieldArray, Form, Formik, useField } from "formik";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewOnWarCode } from "shared/common_types";
import * as yup from "yup";
import type { NextPageWithLayout } from "./_app";

interface AddTargetProps {
  jobs: Job[];
  nationalities: Nationality[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobs = await prisma?.job.findMany();
  const nationalities = await prisma?.nationality.findMany();

  console.log(typeof jobs);

  return {
    props: {
      jobs,
      nationalities,
    },
  };
};

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

  interface AddTargetForm {
    photo: string;
    realName: string;
    nicknames: string[];
    viewOnWar?: ViewOnWarCode;
    jobs: string[];
    resources: string[];
    nationality?: string;
    summary: string;
    links: string[];
    photos: string[];
  }

  const initialValues: AddTargetForm = {
    photo: "",
    realName: "",
    nicknames: [""],
    viewOnWar: undefined,
    jobs: [],
    nationality: undefined,
    resources: [],
    summary: "",
    links: [],
    photos: [],
  };

  const validate = (values: AddTargetForm) => {
    const errors: FormikErrors<AddTargetForm> = {};

    if (!values.nicknames.find((nickname) => nickname !== "")) {
      errors.nicknames = "At least 1";
    }

    return errors;
  };

  const validationSchema = yup.object().shape({
    realName: yup.string().min(2),
    nicknames: yup
      .array()
      .of(yup.object().shape({ value: yup.string() }))
      .required(),
    viewOnWar: yup.mixed().oneOf(Object.values(ViewOnWarCode)).required(),
    jobs: yup.array(yup.mixed().oneOf(props.jobs.map((j) => j.code))).min(1),
    nationality: yup.mixed().oneOf(props.nationalities.map((n) => n.code)),
  });

  return (
    <NoSSRWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validate={validate}
      >
        {(formik) => {
          console.log(formik.values);

          return (
            <Form>
              <div className="flex flex-col items-center px-2">
                <div className="w-full max-w-screen-md"></div>
                <div className="flex w-full max-w-lg flex-col">
                  <Spacer className="h-6" />
                  <Photo className="w-1/2 self-center" />
                  <Spacer className="h-6" />
                  <InputField
                    name="realName"
                    autoComplete="off"
                    placeholderLabel={t("page.add-target.real-name")}
                  />
                  <SectionHeader
                    title={t("page.add-target.section-header.nickname")}
                  />
                  <FieldArray
                    name="nicknames"
                    render={(arrayHelpers) => {
                      const nicknames = formik.values.nicknames;

                      const error =
                        typeof formik.errors.nicknames === "string" &&
                        formik.errors.nicknames;

                      return (
                        <div className="flex flex-col gap-2.5">
                          {/* TODO: make better error component */}
                          {formik.touched.nicknames && error && <p>{error}</p>}
                          {nicknames.map((nickname, i) => (
                            <InputField
                              key={i}
                              name={`nicknames.${i}.value`}
                              autoComplete="off"
                              placeholderLabel={`Псевдонім ${i + 1}`}
                            />
                          ))}
                          <Button
                            type="button"
                            variant="triatery"
                            onClick={() => {
                              arrayHelpers.push("");
                            }}
                          >
                            Add more
                          </Button>
                        </div>
                      );
                    }}
                  />
                  <SectionHeader
                    title={t("page.add-target.section-header.view-on-war")}
                  />
                  <ViewOnWar />
                  <SectionHeader
                    title={t("page.add-target.section-header.job")}
                  />
                  <Field name="jobs">
                    {({ field, form, meta }: FieldProps) => {
                      return (
                        <div className="flex flex-wrap gap-1.5">
                          {props.jobs.map((job, i) => (
                            <Chip
                              key={i}
                              label={job.code}
                              selected={meta.value.includes(job.code)}
                              onClick={() => {
                                let nextValue = [...meta.value];
                                if (meta.value.includes(job.code)) {
                                  nextValue = nextValue.filter(
                                    (j) => j !== job.code
                                  );
                                } else {
                                  nextValue.push(job.code);
                                }
                                form.setFieldValue(field.name, nextValue);
                              }}
                            />
                          ))}
                        </div>
                      );
                    }}
                  </Field>
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
                  <Field name="nationality">
                    {({ field, form, meta }: FieldProps) => {
                      return (
                        <Dropdown
                          placeholderLabel={t(
                            "page.add-target.section-header.nationality"
                          )}
                          selected={meta.value}
                          options={props.nationalities.map((n) => n.code)}
                          onChange1={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        />
                      );
                    }}
                  </Field>
                  <SectionHeader
                    title={
                      <div className="text-h3">
                        Підтвердження позиції людини
                      </div>
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
                    subtitle={t(
                      "page.add-target.section-header.evidence.subtitle"
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
                        <span className="font-bold">отримати сповіщення</span>,
                        коли адмін перевірить додану вами людини, будь ласка,
                        залишіть ваш email.
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
          );
        }}
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
  const [field, meta, helpers] = useField("viewOnWar");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <SelectBox
          label={t(`ViewOnWarCode.${ViewOnWarCode.WITH_UKRAINE}`)}
          value1={ViewOnWarCode.WITH_UKRAINE}
          groupValue={meta.value}
          className="grow py-5"
          handleClick={(i) => helpers.setValue(i)}
        />
        <SelectBox
          label={t(`ViewOnWarCode.${ViewOnWarCode.WITH_ORKY}`)}
          value1={ViewOnWarCode.WITH_ORKY}
          groupValue={meta.value}
          className="grow py-5"
          handleClick={(i) => helpers.setValue(i)}
        />
      </div>
      <SelectBox
        label={t(`ViewOnWarCode.${ViewOnWarCode.PEACE_DEATH}`)}
        value1={ViewOnWarCode.PEACE_DEATH}
        groupValue={meta.value}
        className="py-5"
        handleClick={(i) => helpers.setValue(i)}
      />
      <SelectBox
        label={t(`ViewOnWarCode.${ViewOnWarCode.QUIET}`)}
        value1={ViewOnWarCode.QUIET}
        groupValue={meta.value}
        className="py-5"
        handleClick={(i) => helpers.setValue(i)}
      />
    </div>
  );
}
