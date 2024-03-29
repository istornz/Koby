import { pascalCase, sentenceCase, snakeCase } from "change-case";

export class TemplateAlfreed {
  static generateModel(modelName: string) {
    const pascalCaseName = pascalCase(modelName);

    return `\
class ${pascalCaseName}ViewModel {
  
}
`;
  }

  static generatePage(pageName: string) {
    const pascalCaseName = pascalCase(pageName);
    const snakeCaseName = snakeCase(pageName);

    return `\
import 'package:alfreed/alfreed.dart';
import 'package:flutter/material.dart';

import '${snakeCaseName}_presenter.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Args {
  ${pascalCaseName}Args();
}

class ${pascalCaseName}ViewInterface extends AlfreedView {
  ${pascalCaseName}ViewInterface(BuildContext context) : super(context: context);
}

class ${pascalCaseName}Page extends AlfreedPage<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> {
  ${pascalCaseName}Page({Key? key, ${pascalCaseName}Args? args}) : super(args: args, key: key);
  
  @override
  AlfreedPageBuilder<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> build() {
    return AlfreedPageBuilder<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface>(
      key: const ValueKey('${pascalCaseName}PagePresenter'),
      presenterBuilder: (context) => ${pascalCaseName}Presenter(),
      interfaceBuilder: (context) => ${pascalCaseName}ViewInterface(context),
      builder: (context, presenter, model) {
        return const Scaffold(
          key: ValueKey('${pascalCaseName}Page'),
          body: Text('${pascalCaseName}Page'),
        );
      },
    );
  }
}
`;
  }

  static generatePresenter(presenterName: string) {
    const pascalCaseName = pascalCase(presenterName);
    const snakeCaseName = snakeCase(presenterName);

    return `\
import 'package:alfreed/alfreed.dart';

import '${snakeCaseName}.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Presenter extends Presenter<${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> {
  ${pascalCaseName}Presenter() : super(state: ${pascalCaseName}ViewModel());
  
  @override
  void onInit() {
    super.onInit();

    
  }
}
`;
  }

  static generateTest(pageName: string) {
    const pascalCaseName = pascalCase(pageName);
    const sentenceCaseName = sentenceCase(pageName);

    return `\
import 'package:alfreed/alfreed.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() async {
  // ignore: unused_local_variable
  late ${pascalCaseName}Presenter presenter;
  // ignore: unused_local_variable
  late ${pascalCaseName}ViewModel model;

  // mock repositories here

  // load mocked file here

  group(
    '${sentenceCaseName} - Page',
    () {
      tearDown(() {
        
      });

      setUp(() {

      });

      Future beforeEach(
        WidgetTester tester,
      ) async {
        await initAppWithOnGeneratedRoutes(
          tester,
          home: ${pascalCaseName}Page(),
          routes: (settings) {},
        );
        await tester.pumpAndSettle();

        presenter =
            (tester.widget(find.byKey(ValueKey('${pascalCaseName}PagePresenter')))
                    as PresenterInherited<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel>)
                .presenter;
        model = presenter.state;
      }

      testWidgets('should display page', (WidgetTester tester) async {
        await beforeEach(tester);
  
        expect(find.text('${pascalCaseName}Page'), findsOneWidget);
      });
    },
  );
}
`;
  }
}
