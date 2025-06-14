
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { questionnaireSections } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Starfield from '@/components/Starfield';
import { Wand2 } from 'lucide-react';

const formSchema = z.object(
  Object.fromEntries(
    questionnaireSections.flatMap(section =>
      section.questions.map(q => [q.id, z.string().min(1, { message: "This field is required." })])
    )
  )
);

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      questionnaireSections.flatMap(section =>
        section.questions.map(q => [q.id, ''])
      )
    ),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    navigate('/blueprint', { state: { answers: values } });
  };

  return (
    <div className="min-h-screen w-full relative">
      <Starfield starCount={500} />
      <div className="container mx-auto py-12 px-4 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2">
            Nebula Navigator Questionnaire
          </h1>
          <p className="mt-2 text-neutral-300">
            Answer these questions to generate your custom AI blueprint.
          </p>
        </header>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {questionnaireSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-card/70 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.questions.map((question) => (
                    <FormField
                      key={question.id}
                      control={form.control}
                      name={question.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">{question.label}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={question.placeholder}
                              className="bg-input text-foreground min-h-[100px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-center">
              <Button type="submit" size="lg" className="bg-stellar/80 text-stellar-foreground hover:bg-stellar active:scale-95 transition-all duration-300 animate-pulse-glow">
                <Wand2 className="mr-2 h-5 w-5" />
                Generate AI Blueprint
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuestionnairePage;
