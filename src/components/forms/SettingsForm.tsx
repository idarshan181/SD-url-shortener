'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationForm from '../settings/NotificationForm';
import ProfileForm from '../settings/ProfileForm';

export function SettingsForm() {
  // const onProfileSubmit = async (_data: ProfileFormValues) => {
  //   setIsLoading(true);
  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     toast.success('Profile updated. Your profile information has been updated.');
  //   } catch (error) {
  //     toast.error('Failed to update profile. Please try again.');
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onNotificationsSubmit = async (_data: NotificationsFormValues) => {
  //   setIsLoading(true);
  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     toast.success('Your notification preferences have been saved.');
  //   } catch (error) {
  //     toast.error('Failed to update notification preferences. Please try again.');
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Tabs defaultValue="profile" className="">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="w-full max-w-md">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="notifications" className="w-full max-w-md">
        <NotificationForm />
      </TabsContent>
    </Tabs>
  );
}
