import { apiRequest } from "./client";
import { useApiMutation, useApiQuery } from "./hooks";
import type {
  AboutPayload,
  CommentsListFilters,
  CommentsPayload,
  ContactInfoPayload,
  ContactPayload,
  ContactResponse,
  CreateCommentPayload,
  CreateCommentResponse,
  EventsPayload,
  ExperiencesPayload,
  HomeFeaturedProjectsPayload,
  HomeHeroPayload,
  HomeHighlightsPayload,
  HomeOpenSourcePayload,
  HomeProcessPayload,
  HomeSkillsShowcasePayload,
  NavigationPayload,
  PortfolioSettings,
  ProfilePayload,
  ProjectDetailPayload,
  ProjectsListFilters,
  ProjectsListPayload,
  SeoPagePayload,
  SkillsPayload,
  TestimonialsPayload,
} from "./types";

export async function getSettings(signal?: AbortSignal) {
  return apiRequest<PortfolioSettings>("settings", { signal });
}

export async function getNavigation(signal?: AbortSignal) {
  return apiRequest<NavigationPayload>("navigation", { signal });
}

export async function getSeoPage(pageKey: string, signal?: AbortSignal) {
  return apiRequest<SeoPagePayload>(`seo/pages/${pageKey}`, { signal });
}

export async function getProfile(signal?: AbortSignal) {
  return apiRequest<ProfilePayload>("profile", { signal });
}

export async function getAbout(signal?: AbortSignal) {
  return apiRequest<AboutPayload>("about", { signal });
}

export async function getHomeHero(signal?: AbortSignal) {
  return apiRequest<HomeHeroPayload>("home/hero", { signal });
}

export async function getHomeHighlights(signal?: AbortSignal) {
  return apiRequest<HomeHighlightsPayload>("home/highlights", { signal });
}

export async function getHomeFeaturedProjects(signal?: AbortSignal) {
  return apiRequest<HomeFeaturedProjectsPayload>("home/featured-projects", { signal });
}

export async function getHomeProcess(signal?: AbortSignal) {
  return apiRequest<HomeProcessPayload>("home/process", { signal });
}

export async function getHomeSkillsShowcase(signal?: AbortSignal) {
  return apiRequest<HomeSkillsShowcasePayload>("home/skills-showcase", { signal });
}

export async function getHomeOpenSource(signal?: AbortSignal) {
  return apiRequest<HomeOpenSourcePayload>("home/open-source", { signal });
}

export async function getProjects(filters: ProjectsListFilters = {}, signal?: AbortSignal) {
  return apiRequest<ProjectsListPayload>("projects", {
    signal,
    query: filters,
  });
}

export async function getProject(slug: string, signal?: AbortSignal) {
  return apiRequest<ProjectDetailPayload>(`projects/${slug}`, { signal });
}

export async function getExperiences(signal?: AbortSignal) {
  return apiRequest<ExperiencesPayload>("experiences", { signal });
}

export async function getSkills(signal?: AbortSignal) {
  return apiRequest<SkillsPayload>("skills", { signal });
}

export async function getEvents(signal?: AbortSignal) {
  return apiRequest<EventsPayload>("events", { signal });
}

export async function getTestimonials(signal?: AbortSignal) {
  return apiRequest<TestimonialsPayload>("testimonials", { signal });
}

export async function getComments(filters: CommentsListFilters = {}, signal?: AbortSignal) {
  return apiRequest<CommentsPayload>("comments", {
    signal,
    query: filters,
  });
}

function buildCommentFormData(payload: CreateCommentPayload) {
  const formData = new FormData();

  formData.set("name", payload.name);
  formData.set("email", payload.email);
  formData.set("comment", payload.comment);

  if (payload.role) {
    formData.set("role", payload.role);
  }
  if (payload.rating != null) {
    formData.set("rating", String(payload.rating));
  }
  if (payload.source) {
    formData.set("source", payload.source);
  }
  if (payload.avatar) {
    formData.set("avatar", payload.avatar);
  }

  return formData;
}

export async function createComment(payload: CreateCommentPayload) {
  return apiRequest<CreateCommentResponse>("comments", {
    method: "POST",
    body: buildCommentFormData(payload),
  });
}

export async function getContactInfo(signal?: AbortSignal) {
  return apiRequest<ContactInfoPayload>("contact-info", { signal });
}

export async function createContact(payload: ContactPayload) {
  return apiRequest<ContactResponse>("contact", {
    method: "POST",
    body: payload,
  });
}

export function useSettingsQuery(options?: { trackLoading?: boolean }) {
  return useApiQuery(["settings"], (signal) => getSettings(signal), {
    trackLoading: options?.trackLoading,
  });
}

export function useNavigationQuery(options?: { trackLoading?: boolean }) {
  return useApiQuery(["navigation"], (signal) => getNavigation(signal), {
    trackLoading: options?.trackLoading,
  });
}

export function useSeoPageQuery(pageKey: string, options?: { enabled?: boolean }) {
  return useApiQuery(["seo", pageKey], (signal) => getSeoPage(pageKey, signal), {
    enabled: options?.enabled,
    trackLoading: false,
  });
}

export function useProfileQuery() {
  return useApiQuery(["profile"], (signal) => getProfile(signal));
}

export function useAboutQuery() {
  return useApiQuery(["about"], (signal) => getAbout(signal));
}

export function useHomeHeroQuery() {
  return useApiQuery(["home", "hero"], (signal) => getHomeHero(signal));
}

export function useHomeHighlightsQuery() {
  return useApiQuery(["home", "highlights"], (signal) => getHomeHighlights(signal));
}

export function useHomeFeaturedProjectsQuery() {
  return useApiQuery(
    ["home", "featured-projects"],
    (signal) => getHomeFeaturedProjects(signal)
  );
}

export function useHomeProcessQuery() {
  return useApiQuery(["home", "process"], (signal) => getHomeProcess(signal));
}

export function useHomeSkillsShowcaseQuery() {
  return useApiQuery(
    ["home", "skills-showcase"],
    (signal) => getHomeSkillsShowcase(signal)
  );
}

export function useHomeOpenSourceQuery() {
  return useApiQuery(["home", "open-source"], (signal) => getHomeOpenSource(signal));
}

export function useProjectsQuery(filters: ProjectsListFilters) {
  return useApiQuery(
    ["projects", filters],
    (signal) => getProjects(filters, signal),
    { keepPreviousData: true }
  );
}

export function useProjectQuery(slug: string) {
  return useApiQuery(["project", slug], (signal) => getProject(slug, signal), {
    enabled: Boolean(slug),
  });
}

export function useExperiencesQuery() {
  return useApiQuery(["experiences"], (signal) => getExperiences(signal));
}

export function useSkillsQuery() {
  return useApiQuery(["skills"], (signal) => getSkills(signal));
}

export function useEventsQuery() {
  return useApiQuery(["events"], (signal) => getEvents(signal));
}

export function useTestimonialsQuery() {
  return useApiQuery(["testimonials"], (signal) => getTestimonials(signal));
}

export function useCommentsQuery(filters: CommentsListFilters) {
  return useApiQuery(
    ["comments", filters],
    (signal) => getComments(filters, signal),
    { keepPreviousData: true }
  );
}

export function useCreateCommentMutation() {
  return useApiMutation(createComment);
}

export function useContactInfoQuery() {
  return useApiQuery(["contact-info"], (signal) => getContactInfo(signal));
}

export function useCreateContactMutation() {
  return useApiMutation(createContact);
}
